import React from 'react';
import {View,Text} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createStackNavigator, createSwitchNavigator} from 'react-navigation-stack';

import ScreenOne from '../screens/Home';
// import ScreenTwo from '../screens/Cart';

import SignUp from '../screens/SignUp'
import Login from '../screens/Login'
import Main from '../screens/Home'
// import LiveStream from '../screens/LiveStream'
import Loading from '../screens/Loading';

const BottomTabNavigator = createBottomTabNavigator(
  {
  Shop: ScreenOne,
  Cart: ScreenTwo
}
);

// const LoginFlow = createStackNavigator(
//   {
//       loading: Loading,
//       signup: SignUp,
//       login: Login,
//       main: Main,
//   },
//   {
//       initialRouteName:'loading'
//   },
//   {
//       navigationOptions: {
//           headerTintColor: '#fff',
//           headerStyle: {
//               backgroundColor: '#000',
//           },
//       },
//   }
// );

// const Home = createSwitchNavigator(
//     {
//         loginflow: LoginFlow,
//         home: BottomTabNavigator,
//         // livestream: LiveStream,
//         // home: BottomTabNavigator,
//     }
// );

// const container = createAppContainer(BottomTabNavigator);
// // const container = createAppContainer(RootNavigator);

// export default container;

export default BottomTabNavigator;