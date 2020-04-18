import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';

// pull in the ScreenName component from ScreenName.js
// import ScreenName from '../../components/ScreenName.js'
// import { SearchBar } from 'react-native-elements';

import { Card, ListItem, Button, Icon, Overlay } from 'react-native-elements'

import NavBar from '../../../navigation/navBar'
import FilterOverlay from '../../../navigation/filterOverlay'
import database from '@react-native-firebase/database';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateProducts, initiateProducts,
   toggleFilter, updateCategory, 
   updateScreenVar, updateLiveProducts } from '../../../state/actions';

// import MenuPopUp from '../../components/MenuPopUp';
import { List, Checkbox } from 'react-native-paper';

// var mongoose = require('mongoose');

import ProductStyles from '../../../common/productStyle';

import { FloatingAction } from "react-native-floating-action";

// import mongodb from '../../../common/mongodb';
var mongoose = require('mongoose');

SampleFunction=()=>{

  // Write your own code here, Which you want to execute on Floating Button Click Event.
  Alert.alert("Floating Button Clicked");

}

// // FAB Implementation
// const addIcon = <Icon
//         name='add'
//         type='material'
//         color='#517fa4'/>
// const actions = [
//   {
//     text: "Add Product",
//     icon: {addIcon},
//     name: "bt_accessibility",
//     position: 2
//   }
// ];

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
class LiveProductList extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    liveProducts: [],
    fetchedProducts: [],
    expanded:true,
  }

  _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });

  onFocusFunction = () => {
    // do some stuff on every screen focus
    this.props.updateScreenVar({screen:'LiveProductList'});
    console.log("LiveProductList focused");
  }

  // and don't forget to remove the listener
  componentWillUnmount () {
    this.focusListener.remove()

    // var pList = [];
    // for (var i = 0; i < this.state.liveProducts.length; ++i){
    //   pList.push(this.state.liveProducts[i].id)
    // }

    // database()
    //   .ref("live")
    //   .push()
    //   .set(
    //     {
    //       streamerId: this.props.products.userObj.uid,
    //       streamerRoom: this.props.products.userObj.uid,
    //       pList: pList,
    //     })
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

  componentDidMount() {
    // this.props.updateScreenVar({screen:'category'});

    // mongoose.connect('mongodb://localhost:27017/fyp', {useNewUrlParser: true, user: 'admin', pass: '123456'});



    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction()
    })

    // connect to a Firebase table
     var dbref = this.props.products.dbh.ref('products');
    // save database reference for later
    //  this.props.products.setState ( {dbulref: dbref});
    // meat: this is where it all happens
     dbref.on('value', (e) => {
        var rows = [];
        eJSON = e.toJSON()
        for(var i in eJSON){
          tempJSON = eJSON[i]
          tempJSON["id"] = i;
          tempJSON["isChecked"] = false;
          rows.push(tempJSON);
          // rows.push(eJSON[i]);
        }
        var ds = rows;
        // var ds = this.filterProdByUid(rows);
        this.setState({fetchedProducts: ds})

     });

     database()
      .ref("live/"+this.props.products.userObj.uid)
      // .push()
      .set(
        {
          streamerId: this.props.products.userObj.uid,
          streamerRoom: this.props.products.userObj.email,
          status: 'PREPPING',
          // pList: ['null'],
        })

  }

  componentDidUnMount() {
    this.props.products.dbulref.off('value');
  } 

  // deleteProduct(){}

  updateSearch = search => {
    // this.setState({ search });

    // Normal filter
    this.props.updateCategory(
      {
        dataCategorySearch: this.props.products.dataCategoryDup.filter(function (el) {
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


  getSubStyle(state){
    ProductStyles.smallREQText
    if (state === "REQUESTED") {
      return ProductStyles.smallREQText
    } else if (state === "REJECTED") { 
      return ProductStyles.smallREJText
    } else if (state === "ACCEPTED") {
      return ProductStyles.smallACCText
    } else if (state === "DISCARDED") {
      return ProductStyles.smallDISText
    }
  }

  checkInProduct(key){
  
    // console.log(key)
    // if (this.state.fetchedProducts[key].isChecked){
    //   console.log('unchecked')
    //   this.state.fetchedProducts[key].isChecked = false;
    // } else {
    //   this.state.fetchedProducts[key].isChecked = true;  
    // }

    console.log('key: ', key)

    var i;
    var isAdd = true;
    for (i = 0; i < this.state.liveProducts.length; ++i){
      console.log(this.state.liveProducts[i]) 
      if (this.state.liveProducts[i].id === this.state.fetchedProducts[key].id){
        console.log('true')
        isAdd = false
        break;
      } else {
        console.log('false')
        isAdd = true
      }
    }

    // console.log('matcher ', this.state.liveProducts.findIndex(this.state.liveProducts[key]))

    if (isAdd) {
      var prodList = this.state.liveProducts
      prodList.push(this.state.fetchedProducts[key])
      this.props.updateLiveProducts({liveProductList: prodList})
      this.setState({liveProducts: prodList})
    }

    this.props.products.dbh.ref('live/'+this.props.products.userObj.uid+'/pList').transaction((pList) => {
      var pList = [];
      for (var i = 0; i < this.state.liveProducts.length; ++i){
        pList.push(this.state.liveProducts[i].id)
      }
      return pList;
    })

    

  }

  removeCheckInProduct(key){
  
    // console.log(key)
    // if (this.state.fetchedProducts[key].isChecked){
    //   console.log('unchecked')
    //   this.state.fetchedProducts[key].isChecked = false;
    // } else {
    //   this.state.fetchedProducts[key].isChecked = true;  
    // }
    
    var prodList = this.state.liveProducts
    prodList.splice(key, 1)
    this.props.updateLiveProducts({liveProductList: prodList})
    // prodList.push(this.state.fetchedProducts[key])
    this.setState({liveProducts: prodList})

    this.props.products.dbh.ref('live/'+this.props.products.userObj.uid+'/pList').transaction((pList) => {
      var pList = [];
      for (var i = 0; i < this.state.liveProducts.length; ++i){
        pList.push(this.state.liveProducts[i].id)
      }
      return pList;
    })

  }

  render() {

    const { search } = this.props.products.search;

    const customIcon = <Icon
        name='create'
        type='material'
        color='#517fa4'/>
    // let subStyle = ProductStyles.smallREQText
    
    // cons

    return (
      <View>
        <NavBar/>

        

        { <ScrollView>
          <List.Section title="Please add products">
          <List.Accordion
            title="Your Products"
            left={props => <List.Icon {...props} icon="folder" />}
          >
          {
            // list.map((l, i) => (
            this.state.fetchedProducts.map((l, i) => (
              
              <List.Item title={l.name} 
                onPress={() => {
                    this.checkInProduct(i)
                  }}
                  />
            ))
          }
            <List.Item  style={{height:100}}/>
          </List.Accordion>

        </List.Section>
          <View style={{flex: 1}}>
          {
            // list.map((l, i) => (
            this.state.liveProducts.map((l, i) => (
              <ListItem
                // containerStyle={{height:100,width:1080}}
                key={i}
                leftAvatar={{ source: { uri: l.image } }}
                title={l.name}
                subtitle={l.brand}
                subtitleStyle={this.getSubStyle(l.status)}
                bottomDivider
                chevron={<Icon
                  name={'clear'}
                  type='material'
                  color='#6600ff'
                  onPress={() => {
                    this.removeCheckInProduct(i)
                  }}
                />}
                // onPress={() => {
                //   this.checkInProduct(i)
                // }}
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
    updateCategory,
    updateScreenVar,
    updateLiveProducts,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(LiveProductList);