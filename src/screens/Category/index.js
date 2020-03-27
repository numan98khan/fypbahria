import React from 'react';
import { View, StyleSheet } from 'react-native';

import ScreenName from '../../components/ScreenName.js'

import NavBar from '../../navigation/navBar'

export default class Category extends React.Component {

  static navigationOptions = {

  };

  render() {
    return (
      <View>
        <NavBar/>
        <ScreenName name={'Add'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});