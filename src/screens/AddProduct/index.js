import React from 'react';
import { View, StyleSheet, Button, BackHandler, Alert, Text } from 'react-native';
import { TextInput, Picker, Platform } from 'react-native';

import ScreenName from '../../components/ScreenName.js'
// import NavBar from '../../navigation/navBar'

import { Header, Icon, ButtonGroup, Avatar } from 'react-native-elements';
// import { withNavigation} from 'react-navigation';
import ImgDetailOverlay from '../../components/imageDetailOverlay'

// import PhotoUpload from 'react-native-photo-upload'

export default class AddProduct extends React.Component {

  // static navigationOptions = {

  // };

  // START
  static navigationOptions= {
    title: "Add",
    headerStyle: {
      backgroundColor: "#00ff80"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
      textAlign: "center"
    },
  }
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      titleError:null,
      category: 'Mobiles',
      additionalInfo: '',
      categories: ['Mobiles', 'Laptops', 'Desktops', 'Others'],
      price:''
    }
  }

  handleSubmit = () => {
    let {
      title,
      category,
      additionalInfo,
      price
    } = this.state;
    if(!title){
      this.setState({titleError:'Title is required'})
      return;
    }
    fetch(`${URI}/products`, {
      body: JSON.stringify({
        title,
        category,
        additionalInfo,
        price
      }),
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
    }).then(p => {Alert.alert('Success','Product Saved Successfully')})
  }

  renderCategories = () => {
    return this.state.categories.map(c => <Picker.Item key={c} label={c} value={c} />)
  }

  // END

  backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => this.props.navigation.navigate('home') }
    ]);
    return true;
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    const BackIcon = <Icon
                name='clear'
                color='#fff'
                type='material'
                onPress={() => this.props.navigation.navigate('home')} />
    const TitleView = <View style={{ flexDirection: 'row', justifyContent: 'space-between', width:100 }}>
                          <Text>Add Product</Text>
                      </View>
    return (
      // <View>
      //   <Header
      //     leftComponent={BackIcon}
      //     centerComponent={TitleView}
      //     // rightComponent={{ icon: 'home', style: { color: '#fff' } }}
      //   />
      //   <ScreenName name={'Add Product'} />
      //   <Button
      //       title="Go to Back"
      //       onPress={() => this.props.navigation.navigate('home')}
      //     />
      // </View>
      <View>
      <Header
          leftComponent={BackIcon}
          centerComponent={TitleView}
          // rightComponent={{ icon: 'home', style: { color: '#fff' } }}
        />

      <ImgDetailOverlay/>
      {/* <PhotoUpload>
        <Image
          source={{
            uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
          }}
        />
      </PhotoUpload> */}

      {/* // Standard Avatar with edit button */}
      
      <View style={styles.container}>
      {/* <View > */}
      <Avatar
        // containerStyle={styles.AvatarStyle}
        avatarStyle={styles.AvatarStyle}
        source={{
          uri:
            'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        }}
        showEditButton
        onPress={() => console.log('Avatar Pressed!!!')}
      />  
        <TextInput
          style={styles.control}
          onChangeText={(title) => {
            this.setState({ title,titleError:null })
            if(title.length==0){
              this.setState({ titleError:'Title is required' })
            }
          }}
          value={this.state.title}
          placeholder="Product Name"
          placeholderTextColor="grey"
        />
        {this.state.titleError && <Text style={{color:'red'}}>Title is required</Text>}
        <TextInput
          numberOfLines={5}
          onChangeText={(additionalInfo) => this.setState({ additionalInfo })}
          multiline={true}
          value={this.state.additionalInfo}
          placeholder="Additional Info"
          placeholderTextColor="grey"
          style={styles.additionalInfo}
        />
        <TextInput
          style={styles.control}
          onChangeText={(price) => this.setState({ price })}
          value={this.state.price}
          placeholder="Product Price"
          placeholderTextColor="grey"
          keyboardType="number-pad"
        />
        <Picker
          selectedValue={this.state.language}
          onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
          {this.renderCategories()}
        </Picker>
        <Button
          title="Add"
          onPress={this.handleSubmit}
        />
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  AvatarStyle:{
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    // flex: 2,
    padding: 20,
    alignItems: "stretch",
    backgroundColor: '#ffffff',
  },
  control:{
    ...Platform.select({
      android:{
        height:40
      },
      ios:{
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:'grey',
        marginTop:20,
        marginBottom:20
      }
    })
  },
  additionalInfo:{
    ...Platform.select({
      ios:{
        height:80
      }
    })
  }
});