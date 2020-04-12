

import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import styles from './style'
// import { TextInput } from 'react-native-paper';

import auth from '@react-native-firebase/auth';

export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }
  handleLogin = () => {
    const { email, password } = this.state
      auth()
      .signInWithEmailAndPassword(email, password)
     .then(() => this.props.navigation.navigate('main'))
     .catch(error => this.setState({ errorMessage: error.message }))
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{color:'#6600ff', fontSize: 40}}>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: '#6600ff' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" color="#6600ff" onPress={this.handleLogin} />
        <View>
        <Text> Don't have an account? <Text onPress={() => this.props.navigation.navigate('signup')} style={{color:'#6600ff', fontSize: 18}}> Sign Up </Text></Text>
        </View>
      </View>
    )
  }
}