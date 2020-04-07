import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native'

import NavBar from '../../navigation/navBar'

export default class Credit extends React.Component {
  state = { currentUser: null }
render() {
    const { currentUser } = this.state
return (
    <View>
      <NavBar/>
      <Text>
        Credit
      </Text>
    </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})