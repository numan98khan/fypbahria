import React from 'react';
import { View, StyleSheet, BackHandler, Alert, Text } from 'react-native';
import { TextInput, Picker, Platform ,ScrollView} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {toggleImageFilter , cartFunction} from '../../../state/actions';

import {Snackbar, Card, Button, Dialog, Portal, Title,List, Checkbox , Paragraph  } from 'react-native-paper';


import ScreenName from '../../../components/ScreenName.js'
// import NavBar from '../../navigation/navBar'

import { ListItem, Header, Icon, ButtonGroup, Avatar, Divider, Rating, AirbnbRating } from 'react-native-elements';
// import { withNavigation} from 'react-navigation';
import ImgDetailOverlay from '../../../components/imageDetailOverlay'
import ImagePicker from 'react-native-image-picker';
// import PhotoUpload from 'react-native-photo-upload'

import Slideshow from 'react-native-image-slider-show';

import ProductStyles from '../../../common/productStyle';

import database from '@react-native-firebase/database';

class ProductDetails extends React.Component {

  // static navigationOptions = {
  state = {
        snackVisible:false,
        fetchedReviews: [],
      }

  // START
  static navigationOptions= {
    title: "Add",
    headerStyle: {
      backgroundColor: "#00ff80"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
      textAlign: "center"
    },
  }
  constructor(props) {
    super(props);
    // this.state = {
    //   title: '',
    //   titleError:null,
    //   category: 'Mobiles',
    //   additionalInfo: '',
    //   categories: ['Mobiles', 'Laptops', 'Desktops', 'Others'],
    //   price:'',
    //   snackVisible:true,
    // }
  }

  handleSubmit = () => {
    let {
      title,
      category,
      additionalInfo,
      price
    } = this.state;
    if(!title){
      this.setState({titleError:'Title is required'})
      return;
    }
    fetch(`${URI}/products`, {
      body: JSON.stringify({
        title,
        category,
        additionalInfo,
        price
      }),
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
    }).then(p => {Alert.alert('Success','Product Saved Successfully')})
  }

  renderCategories = () => {
    return this.state.categories.map(c => <Picker.Item key={c} label={c} value={c} />)
  }


  componentDidMount() {
      console.log(this.props.navigation.state.params.item.id);
      database().ref('/').child('productReviews').orderByChild('productId').equalTo(this.props.navigation.state.params.item.id).on("value", function(snapshot) {
          // console.log(snapshot);
          var reviewList = [];
          snapshot.forEach(function(data) {
              // console.log(data.val());
              reviewList.push(data.val());
          }.bind(this));
          this.setState({fetchedReviews: reviewList});
      }.bind(this));

  //   }.bind(this));
  // }.bind(this));

    //   this.props.products.dbh.ref('productReviews').on('value', (e) => {
  //     var rows = [];
  //     // console.log(e);
  //     var eJSON = e.toJSON()
  //     for(var i in eJSON){
  //       var tempJSON = eJSON[i]
  //       tempJSON["id"] = i;
  //       rows.push(tempJSON);
  //     }
  //     // console.log(rows[0])
  //     var ds = rows;

  //       console.log('>>>>>>>>>>>')
  //       console.log(ds)

  //       this.setState({fetchedReviews: ds})
  //       // console.log(dsCat)
  //       // console.log('>>>>>>>>>>>')
  //       // this.props.initiatespecials(
  //       //   {
  //       //       specials: ds,
  //       //     }
  //       //   );
  //         // console.log(this.props.products.dataSourceSearch);
  //  });

  }

  getImages(imgObj) {
      let datasource = [];
    //   console.log(imgObj)
      datasource.push({url: imgObj})
      datasource.push({url:'http://placeimg.com/640/480/any'})
      datasource.push({url:'http://placeimg.com/640/480/any'})
        return datasource;
    }

  componentWillUnmount() {
    // this.backHandler.remove();
  }
    pickImage()
    {
      ("preeeee");
        const options= {
            noData:true
        }
        ImagePicker.launchImageLibrary(options, response => {
        console.log("response", response);
        })
    }

  _onToggleSnackBar = () => this.setState(state => ({ snackVisible: !state.snackVisible }));
  // _onToggleSnackBar = () => console.log('Snack Bar Toggled!!!');
  _onDismissSnackBar = () => this.setState({ snackVisible: false });

  addToCart(item, type){
    this._onToggleSnackBar();
    this.props.cartFunction({product:item, add:1})
  }

  render() {
    const { navigation } = this.props;

    // this

    const item = this.props.navigation.state.params.item;

    const BackIcon = <Icon
                name='clear'
                color='#fff'
                type='material'
                onPress={() => this.props.navigation.navigate('home')} />
    const TitleView = <View style={{ flexDirection: 'row', justifyContent: 'space-between', width:100 }}>
                          <Text>Add Product</Text>
                      </View>
    return (
        
      <View style={styles.container}>
      <Snackbar
                visible={this.state.snackVisible}
                // visible={true}
                onDismiss={this._onDismissSnackBar}
                duration={1000}
                action={{
                  label: 'Ok',
                  onPress: () => {
                    this._onDismissSnackBar()
                  },
                }}
                style={{width:'100%', marginHorizontal:'6.2%'}}
              >
              {/*this.state.snackMessage*/}
              Product Added
            </Snackbar>
      {/* <View > */}
      <ScrollView>
            
            <Card style={styles.cardContainer}>
              <Card.Title title="Product Image" titleStyle={styles.purpDreams} />
              <Card.Cover source={{ uri: item.image }} />
            </Card>   

            <Text style={ProductStyles.headerText}>{item.name}</Text>
            <Text style={ProductStyles.categoryText}>{item.category}</Text>
            <Text style={ProductStyles.priceText}>{item.price} Rs.</Text>
            <Divider style={ProductStyles.dividerStyle} />
            <Rating
                imageSize={20}
                readonly
                startingValue={item.aggregateRating.ratingValue}
                fractions="{1}"
                />
            <View style={{justifyContent: 'center', flexDirection:'row'}}>
                <Text style={ProductStyles.ratingText}>{item.aggregateRating.ratingValue}/5</Text>
            </View>
            <View style={{justifyContent: 'center', flexDirection:'row'}}>
                <Text style={ProductStyles.ratingCount}>{item.aggregateRating.reviewCount} Reviews</Text>
            </View>
            <Divider style={ProductStyles.dividerStyle} />
            <Text style={ProductStyles.descriptionHeader}>Description</Text>
            <Text style={ProductStyles.descriptionText}>{item.description}</Text>
            
            <Divider style={ProductStyles.dividerStyle} />
            {
            
              // list.map((l, i) => (
              this.state.fetchedReviews.map((l, i) => (
                
                  <ListItem
                    // containerStyle={{height:100,width:1080}}
                    key={i}
                    // leftAvatar={{ source: { uri: l.avatar_url } }}
                    // leftAvatar={{ source: { uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" } }}
                    title={l.review}
                    subtitle={<Rating
                      imageSize={15}
                      readonly
                      startingValue={l.rating}
                      fractions="{1}"
                      style={{paddingTop:'2%', paddingRight:'75%',marginBottom:"0%"}}
                      />}
                    bottomDivider
                    // chevron={myMenu}
                    // chevron={<MenuPopUp item={l} attachProduct={1}/>}
                    // onPress={() => {
                    //   this.props.navigation.navigate('detailProduct', {
                    //     item: l,
                    //   });
                    // }}
                  />
              ))
                  }
            
            <Divider style={ProductStyles.dividerStyle} />
            
            <Button 
                // icon="plus" 
                mode="contained"
                color="#6600ff"
                style={{ width:'100%', marginBottom: '3%'}} 
                onPress={() => this.addToCart(item, 'add')}
                >
                  Add to Cart             
              </Button>
              <Button 
                // icon="plus" 
                mode="contained"
                color="#6600ff"
                style={{ width:'100%', marginBottom: '3%'}} 
                onPress={() => this.props.navigation.navigate('sendOffer', {product: item})}
                
                >
                  Send Offer             
              </Button>
              <Button 
                // icon="plus" 
                mode="contained"
                color="#6600ff"
                style={{ width:'100%', marginBottom: '3%'}} 
                onPress={() => this.props.navigation.navigate('addProductReview', {
                  product: item,
                })}
                >
                  Review             
              </Button>
        </ScrollView>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  
  AvatarStyle:{
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "stretch",
    backgroundColor: '#ffffff',
  },
  control:{
    ...Platform.select({
      android:{
        height:40
      },
      ios:{
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:'grey',
        marginTop:20,
        marginBottom:20
      }
    })
  },
  additionalInfo:{
    ...Platform.select({
      ios:{
        height:80
      }
    })
  }
});

const mapStateToProps = (state) => {
  const { products } = state
  return { products }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    cartFunction
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);