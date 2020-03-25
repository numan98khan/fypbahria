// import React from 'react'
// import { StyleSheet, Text, TextInput, View, Button,Alert } from 'react-native'
// import { firebase } from '@react-native-firebase/auth';
// console.reportErrorsAsExceptions = false; // copy paste this line in your App.js

// export default class SignUp extends React.Component {
//   state = { email: '', password: '', errorMessage: '' }
// handleSignUp = () => {
// firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then().catch(function(error) {
//  });
// }
// render() {
//     return (
//       <View style={styles.container}>
//         <Text>Sign Up</Text>
//           <Text style={{ color: 'red' }}>
//             {this.state.errorMessage}
//           </Text>
//         <TextInput
//           placeholder="Email"
//           autoCapitalize="none"
//           style={styles.textInput}
//           onChangeText={email => this.setState({ email })}
//           value={this.state.email}
//         />
//         <TextInput
//           secureTextEntry
//           placeholder="Password"
//           autoCapitalize="none"
//           style={styles.textInput}
//           onChangeText={password => this.setState({ password })}
//           value={this.state.password}
//         />
//         <Button title="Sign Up" onPress={this.handleSignUp} />
//         <Button
//           title="Already have an account? Login"
//           onPress={() => this.props.navigation.navigate('login')}
//         />
//       </View>
//     )
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   textInput: {
//     height: 40,
//     width: '90%',
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginTop: 8
//   }
// })

import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity  } from 'react-native'
import styles from './style'

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';


export default class signUp extends React.Component {
  state = { email: '', password: '', errorMessage: null }
  
  // stores user data in real-time db and moves on to main
  rtdbandcont = () => {
    // Add user info to DB

    auth().onAuthStateChanged(user => {
      // This function captures the user id and adds it to the db
      // console.log("user: " + user);
      database().ref("users/"+user.uid).set(
        {
          property1:"dallu",
          property2:"dallu",
          property3:"dallu",
          property4:"dallu",
        })
    })
    
    this.props.navigation.navigate('main')
  }
  
  handleSignUp = () => {
    console.log(auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => this.rtdbandcont())
    .catch(error => this.setState({ errorMessage: error.message })))
  }

render() {
    return (
      <View style={styles.container}>
      <Text style={{color:'#e93766', fontSize: 40}}>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Sign Up" color="#e93766" onPress={this.handleSignUp}/>
        <View>
        <Text> Already have an account? 
          <Text onPress = {() => this.props.navigation.navigate('login')} style={{color:'#e93766', fontSize: 18}}> 
            Login 
          </Text>
        </Text>
        </View>
      </View>
    )
  }
}