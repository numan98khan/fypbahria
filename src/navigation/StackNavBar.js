import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';

import { Header, Icon, ButtonGroup } from 'react-native-elements';
import { withNavigation} from 'react-navigation';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateProducts, initiateProducts, toggleFilter, toggleSearch } from '../state/actions';

import styles from "./style";

class StackNavBar extends React.Component {

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

      const { options } = scene.descriptor;
      const title =
        options.headerTitle !== undefined
          ? options.headerTitle
          : options.title !== undefined
          ? options.title
          : scene.route.routeName;
      console.log(title)

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
        let backIcon = <Icon
            name={searchIconName}
            color='#fff'
            onPress={() => this.props.toggleSearch()} 
            iconStyle={styles.iconStyle} />;

        return (<Header backgroundColor="#6600ff"
                    centerComponent={{ text: title, style: { color: '#fff' } }}
                    leftComponent={backIcon}
                    >
                  {/* <MyCustomLeftComponent />
                  <MyCustomCenterComponent />
                  <MyCustomRightComponent /> */}
                  </Header>);
    }
  }

  

// const mapStateToProps = (state) => {
//   const { products } = state
//   return { products }
// };

// const mapDispatchToProps = dispatch => (
//   bindActionCreators({
//     toggleFilter,
//     updateProducts,
//     toggleSearch,
//   }, dispatch)
// );


export default StackNavBar 

// export default withNavigation(NavBar) 
// export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(NavBar));