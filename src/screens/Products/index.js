import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';

import ScreenName from '../../components/ScreenName.js'
import { SearchBar } from 'react-native-elements';

import { Card, ListItem, Button, Icon, Overlay } from 'react-native-elements'

import NavBar from '../../navigation/navBar'
import FilterOverlay from '../../navigation/filterOverlay'
import database from '@react-native-firebase/database';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateProducts, initiateProducts, 
        toggleFilter, updateScreenVar,
      toggleSearch  } from '../../state/actions';

import { FloatingAction } from "react-native-floating-action";

import MenuPopUp from '../../components/MenuPopUp';

// import MySearchBar from '../../components/SearchBar/index.js';


class ScreenOne extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    search: '',
  };

  componentDidMount() {
    this.props.updateScreenVar({screen:'products'});
    
    // this.props.updateScreenVar({screen:'category'});
    
    // connect to a Firebase table
     var dbref = this.props.products.dbh.ref('products');
    // save database reference for later
    //  this.props.products.setState ( {dbulref: dbref});
    // meat: this is where it all happens
     dbref.on('value', (e) => {
        var rows = [];
        // console.log(e);
        eJSON = e.toJSON()
        for(var i in eJSON){
          tempJSON = eJSON[i]
          tempJSON["id"] = i;
          rows.push(tempJSON);
        }
        // console.log(rows[0])
        var ds = rows;

        this.props.products.dbh.ref('categories').on('value', (e) => {
          var rowsCat = [{"description": "NONE", "name": "NONE"}];
          eJSON = e.toJSON()
          for(var i in eJSON){
            rowsCat.push(eJSON[i]);
          }
  
          var dsCat = rowsCat;
          // console.log('>>>>>>>>>>>')
          // console.log(ds[0])
          // // console.log(dsCat)
          // console.log('>>>>>>>>>>>')
          this.props.initiateProducts(
            {
                dataSourceSearch: ds,
                dataSourceFilter: dsCat,
                dataSourceDup: ds,
                 loading: false,
              }
            );
            // console.log(this.props.products.dataSourceSearch);
       });
     });

  }

  componentDidUnMount() {
    this.props.products.dbulref.off('value');
  } 

  // deleteProduct(){}

  updateSearch = search => {
    // this.setState({ search });

    // Normal filter
    this.props.updateProducts(
      {
          dataSourceSearch: this.props.products.dataSourceDup.filter(function (el) {
            return el.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
          }),
        }
      );

    

    // this.props.products.dataSourceSearch = this.props.products.dataSourceDup.filter(function (el) {
    //   return el.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    // });
  };

  static navigationOptions = {
    // title: 'Shop',  
  };

  render() {

    const { search } = this.props.products.search;
    const mySearchIcon = <Icon
      name='search'
      type='material'
      color='#517fa4'
      size={26}
    />
    const myCancelIcon = <Icon
      name='search'
      type='material'
      color='#517fa4'
      size={26}
    />

    const customIcon = <Icon
        name='create'
        type='material'
        color='#517fa4'/>

    let MySearchComp;

    if (this.props.products.isSearchBar){
        MySearchComp = <SearchBar
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
    } else {
      MySearchComp = null;
    }
    return (
      <View>
        <NavBar/>
        <FilterOverlay/>
        
        {MySearchComp}

        { <ScrollView>
        <View style={{flex: 1}}>
          {
            // list.map((l, i) => (
            this.props.products.dataSourceSearch.map((l, i) => (
              <ListItem
                // containerStyle={{height:100,width:1080}}
                key={i}
                leftAvatar={{ source: { uri: l.avatar_url } }}
                title={l.name}
                subtitle={l.subtitle}
                bottomDivider
                // chevron={myMenu}
                chevron={<MenuPopUp item={l} attachProduct={1}/>}
              />
            ))
          }
          
        </View>
        </ScrollView> }
      </View>
      

      // implemented without image without header, using ListItem component
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flex: 1,
},
addButton: {
  position: 'relative',
  zIndex: 11,
  left: 0,
  top: 0,
  backgroundColor: '#1A237E',
  width: 70,
  height: 70,
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 8
},
addButtonText: {
  color: '#fff',
  fontSize: 60
},
scrollViewContainer: {
  flex: 1,
  marginBottom: 70,
},
  fab: { 
    position: 'absolute', 
    width: 56, 
    height: 56, 
    alignItems: 'center', 
    justifyContent: 'center', 
    right: 20, 
    bottom: 20, 
    backgroundColor: '#03A9F4', 
    borderRadius: 30, 
    elevation: 8 
    }, 
    fabIcon: { 
      fontSize: 40, 
      color: 'white' 
    }
});

const mapStateToProps = (state) => {
  const { products } = state
  return { products }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    updateProducts,
    initiateProducts,
    toggleFilter,
    updateScreenVar,
    toggleSearch,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ScreenOne);

// <SearchBar
//           placeholder="Type Here..."
//           onChangeText={this.updateSearch}
//           value={search}
//           platform="android"
//           containerStyle={StyleSheet.create({
//             container: {
//               flex: 1,
//               alignItems: 'center',
//               justifyContent: 'center',
//             },
//           })}
//           // searchIcon={customIcon}
//           // searchIcon={mySearchIcon}
//           // cancelIcon={myCancelIcon}
//         />