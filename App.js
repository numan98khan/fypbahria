import 'react-native-gesture-handler';
import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
// import the different screens
import Home from './src/navigation/navigation'
// create our app's navigation stack

import database from '@react-native-firebase/database';

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
import store from './src/state/store'

console.disableYellowBox = true;

export default class App extends React.Component{
render()
{
  // *** Porduct addition code
  // var i;
  // for (i = 0; i < 20; i++) {
  //   database()
  //     .ref("products")
  //     .push()
  //     .set(
  //       {
  //         brand: "Acme",
  //         logo: "http://www.example.com/logo.png",
  //         name: "WidgetPress"+String(i),
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

  return <Provider store={store}>
          <Home />
         </Provider>;
}
}
