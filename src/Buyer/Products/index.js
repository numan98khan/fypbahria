import React from 'react';
import { View, Animated, StyleSheet, Text, Image, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native';

import ScreenName from '../../components/ScreenName.js'
// import { SearchBar } from 'react-native-elements';
import { Searchbar } from 'react-native-paper';

import { ListItem, Button, Icon, Overlay } from 'react-native-elements'

import {Snackbar,  Card  } from 'react-native-paper';


import NavBar from '../../navigation/navBar'
import FilterOverlay from '../../navigation/filterOverlay'
import database from '@react-native-firebase/database';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateProducts, initiateProducts, 
        toggleFilter, updateScreenVar,
      toggleSearch , initiatespecials } from '../../state/actions';

import Swipeable from 'react-native-gesture-handler/Swipeable';

import { FloatingAction } from "react-native-floating-action";

import MenuPopUp from '../../components/MenuPopUp';

import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient'; // Only if no expo

import { FlatList, RectButton } from 'react-native-gesture-handler';

import { SliderBox } from "react-native-image-slider-box";

class ScreenOne extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    search: '',
    _swipeableRow: null,
    currentAdIndex: 0,
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
        var eJSON = e.toJSON()
        for(var i in eJSON){
          var tempJSON = eJSON[i]
          tempJSON["id"] = i;
          rows.push(tempJSON);
        }
        // console.log(rows[0])
        var ds = rows;

        this.props.products.dbh.ref('categories').on('value', (e) => {
          var rowsCat = [{"description": "NONE", "name": "NONE", "id": "NONE"}];
          var eJSON = e.toJSON()
          for(var i in eJSON){
            var tempJSON = eJSON[i]
            tempJSON["id"] = i;
            rowsCat.push(tempJSON);
          }
  
          var dsCat = rowsCat;
          // console.log('>>>>>>>>>>>')
          // // console.log(ds[0])
          // console.log(dsCat)
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

     this.props.products.dbh.ref('specials').on('value', (e) => {
      var rows = [];
      // console.log(e);
      var eJSON = e.toJSON()
      for(var i in eJSON){
        var tempJSON = eJSON[i]
        tempJSON["id"] = i;
        rows.push(tempJSON);
      }
      // console.log(rows[0])
      var ds = rows;

        console.log('>>>>>>>>>>>')
        console.log(ds)
        // console.log(dsCat)
        // console.log('>>>>>>>>>>>')
        this.props.initiatespecials(
          {
              specials: ds,
            }
          );
          // console.log(this.props.products.dataSourceSearch);
   });

   this.props.products.dbh.ref('ads').on('value', (e) => {
    var rows = [];
    // console.log(e);
    var eJSON = e.toJSON()
    for(var i in eJSON){
      var tempJSON = eJSON[i]
      tempJSON["id"] = i;
      rows.push(tempJSON);
    }
    // console.log(rows[0])
    var ds = rows;

      console.log('>>>>>>>>>>>')
      console.log(ds)
      
      this.setState({ads: ds});

      // console.log(dsCat)
      // console.log('>>>>>>>>>>>')
        // console.log(this.props.products.dataSourceSearch);
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

  renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    // console.log(item)
    return (
      <RectButton style={styles.leftAction} onPress={this.close}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}>
          Add to Cart
        </Animated.Text>
      </RectButton>
    );
  };

  updateRef = ref => {
    this._swipeableRow = ref;
  };

  close = () => {
    // console.log(this._swipeableRow)
    this._swipeableRow.close();
  };

  onLayout = e => {
    this.setState({
      width: e.nativeEvent.layout.width
    });
  };

  // setCurrentAd(index){
  //   this.setState({currentAdIndex: index})
  // }
  getItemInAds(index, key){
    try {
      // adddlert("Welcome guest!");
      if (key === 'name') {
        console.log('whatevr')
        return this.state.ads[index].name;
      } else {
        return this.state.ads[index].description;  
      }
    }
    catch(err) {
      console.log(err.toString())
      // return 'Loading'
      // document.getElementById("demo").innerHTML = err.message;
    }
  }

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

        const items = [
          {
            uri: "http://www.lovethemountains.co.uk/wp-content/uploads/2017/05/New-Outdoor-Sports-and-Music-Festival-For-Wales-4.jpg",
            title: "Michael Malik",
            text: "Minnesota, USA",
          },
          {
            uri: "http://blog.adrenaline-hunter.com/wp-content/uploads/2018/05/bungee-jumping-barcelona-1680x980.jpg",
            title: "Victor Fallon",
            text: "Val di Sole, Italy",
            duration: 3000
          },
          {
            uri: "https://greatist.com/sites/default/files/Running_Mountain.jpg",
            title: "Mary Gomes",
            text: "Alps",
            fullWidth: true
          }
        ]

    const {width, height} = Dimensions.get('window')

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

    // <Card style={styles.firstCardContainer}>
    //         <Card.Title title="Sales" titleStyle={styles.purpDreams} subtitle="Last Week" />
    //         <Card.Content style={{paddingBottom:'1%', height:'40%'}}>
    //           <TimedSlideshow
    //             items={items}
    //           />
    //         </Card.Content>
    //       </Card>


    

    
          
    return (
      <View>
        <NavBar/>
        <FilterOverlay/>
        
        {MySearchComp}
          

        { <ScrollView>
          
          
          <View style={{flex: 1}}>

            <Card style={styles.firstCardContainer}>
              <Card.Title title="Sponsors" titleStyle={styles.purpDreams} subtitle="This Week" />
              <Card.Content style={{paddingBottom:'5%', flexDirection:'row'}}>
                <SliderBox images={[
                        "https://source.unsplash.com/1024x768/?nature",
                        "https://source.unsplash.com/1024x768/?water",
                        "https://source.unsplash.com/1024x768/?girl",
                        "https://source.unsplash.com/1024x768/?tree", // Network image
                      ]}
                      onCurrentImagePressed={index => console.log(`image ${index} pressed`)}
                      currentImageEmitter={index => this.setState({currentAdIndex: index})}
                      sliderBoxHeight={200} 
                      parentWidth={width*0.81}
                      autoplay
                      circleLoop
                  /> 

              </Card.Content>
              <Card.Content style={{paddingBottom:'5%'}}>
                <Text style={styles.listHead}> {this.getItemInAds(this.state.currentAdIndex, 'name')} </Text>
                <Text style={{paddingLeft:'1%'}}> {this.getItemInAds(this.state.currentAdIndex, 'description')} </Text>
                </Card.Content>
            </Card>
            
            <View style={{marginBottom:'1%'}}>
              <ListItem
                // containerStyle={{height:100,width:1080}}
                // key={i}
                // leftAvatar={{ source: { uri: l.avatar_url } }}
                // leftAvatar={{ source: { uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" } }}
                title={'Featured Products'}
                titleStyle={styles.listHead}
                // subtitle={l.brand}
                bottomDivider
                // chevron={myMenu}
                // chevron={<MenuPopUp item={l} attachProduct={1}/>}
                // onPress={() => {
                //   this.props.navigation.navigate('detailProduct', {
                //     item: l,
                //   });
                // }}
              />
              {
            
                // list.map((l, i) => (
                this.props.products.specials.map((l, i) => (
                  
                    <ListItem
                      // containerStyle={{height:100,width:1080}}
                      key={i}
                      // leftAvatar={{ source: { uri: l.avatar_url } }}
                      leftAvatar={{ source: { uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" } }}
                      title={l.name}
                      subtitle={l.brand}
                      bottomDivider
                      // chevron={myMenu}
                      // chevron={<MenuPopUp item={l} attachProduct={1}/>}
                      onPress={() => {
                        this.props.navigation.navigate('detailProduct', {
                          item: l,
                        });
                      }}
                    />
                ))
                    }
            </View>

            <ListItem
                // containerStyle={{height:100,width:1080}}
                // key={i}
                // leftAvatar={{ source: { uri: l.avatar_url } }}
                // leftAvatar={{ source: { uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" } }}
                title={'Our Products'}
                titleStyle={styles.listHead}
                // subtitle={l.brand}
                bottomDivider
                // chevron={myMenu}
                // chevron={<MenuPopUp item={l} attachProduct={1}/>}
                // onPress={() => {
                //   this.props.navigation.navigate('detailProduct', {
                //     item: l,
                //   });
                // }}
              />

          {
            
            // list.map((l, i) => (
            this.props.products.dataSourceSearch.map((l, i) => (
              
                <ListItem
                  // containerStyle={{height:100,width:1080}}
                  key={i}
                  // leftAvatar={{ source: { uri: l.avatar_url } }}
                  leftAvatar={{ source: { uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" } }}
                  title={l.name}
                  subtitle={l.brand}
                  bottomDivider
                  // chevron={myMenu}
                  // chevron={<MenuPopUp item={l} attachProduct={1}/>}
                  onPress={() => {
                    this.props.navigation.navigate('detailProduct', {
                      item: l,
                    });
                  }}
                />
            ))
                }
                <ListItem
                // containerStyle={{height:100,width:1080}}
                // key={i}
                // leftAvatar={{ source: { uri: l.avatar_url } }}
                // leftAvatar={{ source: { uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" } }}
                title={'End Of List'}
                // titleStyle={{alignContent:'center', flexDirection:'row'}}
                // subtitle={l.brand}
                bottomDivider
                // chevron={myMenu}
                // chevron={<MenuPopUp item={l} attachProduct={1}/>}
                // onPress={() => {
                //   this.props.navigation.navigate('detailProduct', {
                //     item: l,
                //   });
                // }}
              />
              <ListItem
                // containerStyle={{height:100,width:1080}}
                // key={i}
                // leftAvatar={{ source: { uri: l.avatar_url } }}
                // leftAvatar={{ source: { uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" } }}
                title={'End Of List'}
                // titleStyle={{alignContent:'center', flexDirection:'row'}}
                // subtitle={l.brand}
                bottomDivider
                // chevron={myMenu}
                // chevron={<MenuPopUp item={l} attachProduct={1}/>}
                // onPress={() => {
                //   this.props.navigation.navigate('detailProduct', {
                //     item: l,
                //   });
                // }}
              />
              <ListItem
                // containerStyle={{height:100,width:1080}}
                // key={i}
                // leftAvatar={{ source: { uri: l.avatar_url } }}
                // leftAvatar={{ source: { uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" } }}
                title={'End Of List'}
                // titleStyle={{alignContent:'center', flexDirection:'row'}}
                // subtitle={l.brand}
                bottomDivider
                // chevron={myMenu}
                // chevron={<MenuPopUp item={l} attachProduct={1}/>}
                // onPress={() => {
                //   this.props.navigation.navigate('detailProduct', {
                //     item: l,
                //   });
                // }}
              />
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
  cardContainer: {
    margin:'5%',
    marginVertical:'2.5%'
  },
  firstCardContainer: {
    margin:'5%',
    marginVertical:'2.5%',
    marginTop:'3%'
  },
  listHead: {
    color:"#6600ff",
    fontSize:20
  },
  purpDreams: {
    color:"#6600ff"
  },
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
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
    initiatespecials
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