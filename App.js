import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
// import the different screens
import Home from './src/navigation/navigation'
// create our app's navigation stack

import database from '@react-native-firebase/database';

database().ref("users/1").set({name:"dallu"})

// console.log(database().app.name); // '[DEFAULT]'
// console.log("yo")

export default class App extends React.Component{
render()
{
  return <Home />;
}
}
