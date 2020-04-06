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

  console.log("total angst: " + this.props.products);
  
  const handleButtonPress = () => {
    LocalNotification()
    // RemotePushController()
  }

  var AppMode;
  if (this.props.products.appMode === 'seller') {
    AppMode = <SellerNav />
  } else {
    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXX')
    AppMode = <BuyerNav />
  }

  console.log('AppMode : '+this.props.products.appMode);

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
  

/////// USE SENDGRID.COM

  // console.log(auth().getUserNyEmail("noma@gmail.com"))
  
  // database().ref('/').child('users').orderByChild('email').equalTo('noma@gmail.com').once("value", function(snapshot) {
  //     // console.log(snapshot.val().key();

  //     snapshot.forEach(function(data) {
  //         console.log(data.key);
  //     });
  // });

  // // *** Product addition code
  // var i;

  // for (i = 0; i < 4; i++) {
  //   // console.log('>>>>>>'+
  //     database()
  //     .ref("reviews")
  //     .push()
  //     .set(
  //       {
  //         review: "This is an excellent widget with 21 features and 4 colors.",
  //         productId: "id",
  //         buyerId: "id",
  //         sellerId: "id",
  //       })
  //     // )
  // }  


  // for (i = 0; i < 4; i++) {
  //   // console.log('>>>>>>'+
  //     database()
  //     .ref("categories")
  //     .push()
  //     .set(
  //       {
  //         name: "Category"+String(i),
  //         description: "This is an excellent widget with 21 features and 4 colors.",
  //       })
  //     // )
  // }  

  // var categoryData;
  // database().ref('categories').on('value', (e) => {
  //     categoryData = [];
  //     // console.log(e);
  //     eJSON = e.toJSON()
  //     for(var i in eJSON){
  //       // console.log(eJSON[i])
  //       categoryData.push(i);
  //     }
  //     for (i = 0; i < 20; i++) {
  //       database()
  //         .ref("products")
  //         .push()
  //         .set(
  //           {
  //             brand: "Acme",
  //             logo: "http://www.example.com/logo.png",
  //             name: "Product"+String(i),
  //             category: categoryData[i%4],
  //             image: "http://www.example.com/image.jpg",
  //             description: "This is an excellent widget with 21 features and 4 colors.",
  //             aggregateRating: {
  //               type: "aggregateRating",
  //               ratingValue: "5",
  //               reviewCount: "21"
  //             }
  //           })
  //     }
  //     // console.log(categoryData)
  // });

  // console.log('dalli')
  // console.log(categoryData);

  // for (i = 0; i < 20; i++) {
  //   database()
  //     .ref("products")
  //     .push()
  //     .set(
  //       {
  //         brand: "Acme",
  //         logo: "http://www.example.com/logo.png",
  //         name: "Product"+String(i),
  //         category: "Widgets",
  //         image: "http://www.example.com/image.jpg",
  //         description: "This is an excellent widget with 21 features and 4 colors.",
  //         aggregateRating: {
  //           type: "aggregateRating",
  //           ratingValue: "5",
  //           reviewCount: "21"
  //         }
  //       })
  // }