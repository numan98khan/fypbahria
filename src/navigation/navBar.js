import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';

import { Header, Icon, ButtonGroup } from 'react-native-elements';
import { withNavigation} from 'react-navigation';

class NavBar extends React.Component {

    // state = {
    //   isFilterVisible: false,
    // };
    constructor () {
      super()
      this.state = {
        selectedIndex: 2
      }
      this.updateIndex = this.updateIndex.bind(this)
    }
    updateIndex (selectedIndex) {
      this.setState({selectedIndex})
    }
    render(){
      const { selectedIndex } = this.state

        const MenuIcon = <Icon
                name='menu'
                color='#fff'
                onPress={() => this.props.navigation.toggleDrawer()} />

        // const FilterIcon = <Icon
        //         name='tune'
        //         color='#fff'
        //         onPress={() => console.log('filters enabled')} />

        const rightComp = <View style={{ flexDirection: 'row', justifyContent: 'space-between', width:100 }}>
          <Icon
                name='search'
                color='#fff'
                onPress={() => console.log('filters enabled')} />
          <Icon
                name='add'
                color='#fff'
                // onPress={() => console.log('add enabled')} 
                onPress={() => this.props.navigation.navigate('adder')} 
                />
          <Icon
                name='tune'
                color='#fff'
                onPress={() => console.log('filters enabled')} />
        </View>
        return(
      <View>
       {this.props.children}
       <Header leftComponent={MenuIcon}
              rightComponent={rightComp}
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