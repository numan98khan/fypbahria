import React, { Component } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

import { NavigationActions, StackActions } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';


export default class Loading extends Component {
  
  componentDidMount() {
    auth().onAuthStateChanged(user => {
      // **for the purpose of directly logging in if creds entered already
      
      const routeToGoTo = 'home';
      // const routeToGoTo = 'adder';

      this.props.navigation.navigate(routeToGoTo)

      // this.props.navigation.toggleDrawer()
      // this.props.navigation.navigate(user ? 'home' : 'signup')
      // **For testing only
      // this.props.navigation.navigate('signup')

      // const routeToGoTo = 'addpage';
      // const routeToGoTo = 'home';
      
      // const resetAction = StackActions.reset({
      //   index: 0,
      //   actions: [NavigationActions.navigate({ routeName: routeToGoTo })],
      // });
      
      // this.props.navigation.dispatch(resetAction);
      
      console.log(user.uid);

      // this.props.navigation.dispatch(DrawerActions.openDrawer());
    })
  }

  render() {
    return (
      <View style={styles.container}>
        
        <Text style={{color:'#e93766', fontSize: 40}}>Loading</Text>
        <ActivityIndicator color='#e93766' size="large" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});