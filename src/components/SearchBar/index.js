import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';

import { Header, Icon, ButtonGroup } from 'react-native-elements';
import { withNavigation} from 'react-navigation';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateProducts, initiateProducts, toggleFilter } from '../../state/actions';

import { SearchBar } from 'react-native-elements';

import database from '@react-native-firebase/database';

// import styles from "./style";

class MySearchBar extends React.Component {
    state = {
      search: '',
    };
  
    updateSearch = search => {
        // this.setState({ search });

        // Normal filter
        console.log(this.props.location);
        this.props.updateProducts(
        {
            dataSourceSearch: this.props.products.dataSourceDup.filter(function (el) {
                return el.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
            }),
            }
        );
    }

    render() {
      const { search } = this.state;
  
      return (
        <SearchBar
            placeholder="Type Here..."
              onChangeText={this.updateSearch}
              value={search}
              platform="android"
              containerStyle={StyleSheet.create({
                container: {
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              })}
        />
      );
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

// export default MySearchBar 
export default connect(mapStateToProps, mapDispatchToProps)(MySearchBar);