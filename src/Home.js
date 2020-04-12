import 'react-native-gesture-handler';
import React from 'react'
import { StyleSheet, Platform, Image, Button,  Text, View } from 'react-native'
// import the different screens
import BuyerNav from './navigation/BuyerNav';
import SellerNav from './navigation/navigation';
// create our app's navigation stack

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

// database().ref("products").push().getKey()//set({name:"dallu"})
// database().getReference("quiz").push().getKey();
// console.log(database().app.name); // '[DEFAULT]'
// await newUserRef.set({
//   first: 'Ada',
//   last: 'Lovelace',
// });

// *****************YELLLLLLLLL*****************
// *****************YELLLLLLLLL*****************
// *****************YELLLLLLLLL*****************
// *****************YELLLLLLLLL*****************
// *****************YELLLLLLLLL*****************
// *****************YELLLLLLLLL*****************
// *****************YELLLLLLLLL*****************
// *****************YELLLLLLLLL*****************
// *****************YELLLLLLLLL*****************
// *****************YELLLLLLLLL*****************
// RESTORE YELLOW WARNINGS INDISE APP AT SOME POINT
// *****************YELLLLLLLLL*****************
// *****************YELLLLLLLLL*****************
// *****************YELLLLLLLLL*****************
// *****************YELLLLLLLLL*****************
// *****************YELLLLLLLLL*****************
// *****************YELLLLLLLLL*****************
// *****************YELLLLLLLLL*****************
// *****************YELLLLLLLLL*****************
// *****************YELLLLLLLLL*****************
// *****************YELLLLLLLLL*****************


import { Provider } from 'react-redux'
import store from './state/store'

import { MenuProvider } from 'react-native-popup-menu';
import {Provider as PaperProvider} from 'react-native-paper';

import { LocalNotification } from './services/LocalPushController'
// after other import statements
import RemotePushController from './services/RemotePushController'

import messaging from '@react-native-firebase/messaging';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateProducts, initiateProducts, 
        toggleFilter, updateScreenVar,
      toggleSearch  } from './state/actions';


console.disableYellowBox = true;

class BaseApp extends React.Component{
render()
{

  
  const handleButtonPress = () => {
    LocalNotification()
    // RemotePushController()
  }

  var AppMode;
  if (this.props.products.appMode === 'seller') {
    AppMode = <SellerNav />
  } else {
    AppMode = <BuyerNav />
  }

  // console.log('AppMode : '+this.props.products.appMode);

  return AppMode;
    // return <BuyerNav/>

}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    marginTop: 20
  }
})


const mapStateToProps = (state) => {
    const { products } = state
    return { products }
  };
  
  const mapDispatchToProps = dispatch => (
    bindActionCreators({
      updateProducts,
      initiateProducts,
      toggleFilter,
      updateScreenVar,
      toggleSearch,
    }, dispatch)
  );
  
  export default connect(mapStateToProps, mapDispatchToProps)(BaseApp);
  
