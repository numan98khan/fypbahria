import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';

import { Header, Icon, ButtonGroup } from 'react-native-elements';
import { withNavigation} from 'react-navigation';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateProducts, initiateProducts, toggleFilter } from '../state/actions';

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

        let rightComp;
        if (this.props.products.currentScreen === 'products'){
          console.log('debug1');
          rightComp = <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
                  onPress={() => this.props.toggleFilter()} />
          </View>
        } else if (this.props.products.currentScreen === 'category') {
          console.log('debug');
          rightComp = <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
          </View>
        }
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

const mapStateToProps = (state) => {
  const { products } = state
  return { products }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    toggleFilter,
    updateProducts,
  }, dispatch)
);

// export default withNavigation(NavBar) 
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(NavBar));