import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';

import { Header, Icon } from 'react-native-elements';
import { withNavigation} from 'react-navigation';

class NavBar extends React.Component {

    // state = {
    //   isFilterVisible: false,
    // };

    render(){
        const menuIcon = <Icon
                name='menu'
                color='#fff'
                onPress={() => this.props.navigation.toggleDrawer()} />

        const filterIcon = <Icon
                name='tune'
                color='#fff'
                onPress={() => console.log('filters enabled')} />
        return(
      <View>
       {this.props.children}
       <Header leftComponent={menuIcon}
              rightComponent={filterIcon}
              >
        {/* <MyCustomLeftComponent />
        <MyCustomCenterComponent />
        <MyCustomRightComponent /> */}
        </Header>
      </View>
      )
    }
  }

export default withNavigation(NavBar) 