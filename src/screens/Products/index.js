import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';

import ScreenName from '../../components/ScreenName.js'
// import { SearchBar } from 'react-native-elements';
import { Searchbar } from 'react-native-paper';

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

import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient'; // Only if no expo


// import MySearchBar from '../../components/SearchBar/index.js';


class ScreenOne extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    search: '',
  };

  onFocusFunction = () => {
    // do some stuff on every screen focus
    this.props.updateScreenVar({screen:'products'});
    console.log("producst focused");
  }

  // and don't forget to remove the listener
  componentWillUnmount () {
    this.focusListener.remove()
  }

  filterProdByUid(eJSON){
    var rowsCat = [];// = [{"description": "NONE", "name": "NONE"}];
    for(var i in eJSON){
      // console.log(this.props.products.userObj.uid + " " + eJSON[i].sellerId);
      // console.log('bih + ' + eJSON[i])
      if (this.props.products.userObj.uid === eJSON[i].sellerId) {
        // console.log('bih + ' + eJSON[i])
        tempJSON = eJSON[i]
        // tempJSON["id"] = i;
        rowsCat.push(tempJSON);
      }
    }
    return rowsCat;
  }

  filterCatByUid(eJSON){
    var rowsCat = [];// = [{"description": "NONE", "name": "NONE"}];
    for(var i in eJSON){
      // console.log(this.props.products.userObj.uid + " " + eJSON[i].sellerId);
      // console.log('bih + ' + eJSON[i])
      if (this.props.products.userObj.uid === eJSON[i].userId) {
        console.log('bih + ' + eJSON[i])
        tempJSON = eJSON[i]
        // tempJSON["id"] = i;
        rowsCat.push(tempJSON);
      }
    }
    return rowsCat;
  }


  componentDidMount() {
    // this.props.updateScreenVar({screen:'products'});
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction()
    })
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
        console.log(rows)
        // var ds = rows;
        var ds = this.filterProdByUid(rows);
        console.log(ds)

        this.props.products.dbh.ref('categories').on('value', (e) => {
          var rowsCat = [{"description": "NONE", "name": "NONE", "id": "NONE"}];
          eJSON = e.toJSON()
          for(var i in eJSON){
            tempJSON = eJSON[i]
            tempJSON["id"] = i;
            rowsCat.push(tempJSON);
          }
  
          // var dsCat = rowsCat;
          var dsCat = this.filterCatByUid(rowsCat);
          // console.log('>>>>>>>>>>>')
          // // console.log(ds[0])
          console.log(dsCat)
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
    console.log("unmountedddddddd");
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

    const { navigation } = this.props;
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

    // if (this.props.products.isSearchBar){
        MySearchComp = <Searchbar
                  placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={search}
                    // platform="android"
                    // showLoading={true}
                    containerStyle={StyleSheet.create({
                      container: {
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position:'absolute',
                        
                      },
                    })}
              />
    // } else {
      // MySearchComp = null;
    // }
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
                leftAvatar={{ source: { uri: l.image } }}
                // leftAvatar={{ source: { uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" } }}
                title={l.name}
                subtitle={l.brand}
                bottomDivider
                // chevron={myMenu}
                chevron={<MenuPopUp item={l} attachProduct={1}/>}
                onPress={() => {
                  this.props.navigation.navigate('detailProduct', {
                    item: l,
                  });
                }}
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

// { <ScrollView>
//   <View style={{flex: 1}}>
//     {
//       // list.map((l, i) => (
//       this.props.products.dataSourceSearch.map((l, i) => (
//         <ListItem
//           // containerStyle={{height:100,width:1080}}
//           key={i}
//           // leftAvatar={{ source: { uri: l.avatar_url } }}
//           leftAvatar={{ source: { uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" } }}
//           title={l.name}
//           subtitle={l.brand}
//           bottomDivider
//           // chevron={myMenu}
//           chevron={<MenuPopUp item={l} attachProduct={1}/>}
//         />
//       ))
//     }

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