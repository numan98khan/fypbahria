import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';

import { Header, Icon, ButtonGroup } from 'react-native-elements';
import { withNavigation} from 'react-navigation';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateProducts, initiateProducts, toggleFilter, toggleSearch } from '../state/actions';

import styles from "./style";

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
                onPress={() => this.props.navigation.toggleDrawer()}
                iconStyle={styles.iconStyle} />

        // const FilterIcon = <Icon
        //         name='tune'
        //         color='#fff'
        //         onPress={() => console.log('filters enabled')} />

        let searchIconName;
        if (this.props.products.isSearchBar){
          searchIconName = 'close';
        } else {
          searchIconName = 'search';
        }
        let searchIcon = <Icon
            name={searchIconName}
            color='#fff'
            onPress={() => this.props.toggleSearch()} 
            iconStyle={styles.iconStyle} />;

        let rightComp;

        console.log("NAVBAR ::: " + this.props.products.currentScreen);

        if (this.props.products.currentScreen === 'products'){
          // console.log('debug1');
          rightComp = <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {searchIcon}  
          <Icon
                  name='add'
                  color='#fff'
                  // onPress={() => console.log('add enabled')} 
                  onPress={() => this.props.navigation.navigate('addProduct')} 
                  iconStyle={styles.iconStyle} />
            <Icon
                  name='tune'
                  color='#fff'
                  onPress={() => this.props.toggleFilter()}
                  iconStyle={styles.iconStyle}  />
          </View>
        } else if (this.props.products.currentScreen === 'category') {
          // console.log('debug');
          rightComp = <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {searchIcon}
            <Icon
                  name='add'
                  color='#fff'
                  // onPress={() => console.log('add enabled')} 
                  onPress={() => this.props.navigation.navigate('addCategory')} 
                  iconStyle={styles.iconStyle}
                  />
          </View>
        } else if (this.props.products.currentScreen === 'reviews') {
          // console.log('debug');
          rightComp = <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {searchIcon}
            <Icon
                  name='add'
                  color='#fff'
                  // onPress={() => console.log('add enabled')} 
                  onPress={() => this.props.navigation.navigate('addReview')} 
                  iconStyle={styles.iconStyle}
                  />
          </View>
        }
        return(
      <View>
       {this.props.children}
       <Header leftComponent={MenuIcon}
              rightComponent={rightComp}
              backgroundColor="#6600ff"
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
    toggleSearch,
  }, dispatch)
);

// export default withNavigation(NavBar) 
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(NavBar));