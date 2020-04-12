import React from 'react';
import { View, StyleSheet, BackHandler, Alert, Text } from 'react-native';
import {  Picker, Platform ,ScrollView} from 'react-native';

import {Snackbar, TextInput, Card, Avatar, Button, Dialog, Portal, Title,List, Checkbox , Paragraph  } from 'react-native-paper';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {toggleImageFilter, initiateProducts } from '../../../state/actions';

import ScreenName from '../../../components/ScreenName.js'
// import NavBar from '../../navigation/navBar'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import ImgDetailOverlay from '../../../components/imageDetailOverlay'
import ImagePicker from 'react-native-image-picker';
// import PhotoUpload from 'react-native-photo-upload'

import { Header, Icon, ButtonGroup, Divider, Rating, AirbnbRating } from 'react-native-elements';
// import { withNavigation} from 'react-navigation';

import Slideshow from 'react-native-image-slider-show';

import ProductStyles from '../../../common/productStyle';

class SendOffer extends React.Component {

  // static navigationOptions = {

  // };

  state = {
    snackVisible: false,
    snackMessage:'',
    liveemail:''
  };

  constructor(props) {
    super(props);
  }

  // END

  backAction = () => {
    if (this.isSaveable(false)){
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => this.props.navigation.goBack() }
      ]);
    } else {
      this.props.navigation.goBack()
    }
    return true;
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
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
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }
    pickImage()
    {
    // console.log("preeeee");
        const options= {
            noData:true
        }
        ImagePicker.launchImageLibrary(options, response => {
        // console.log("response", response);
        })
    }

  _showDialog = () => this.setState({ visible: true });
  _hideDialog = () => this.setState({ visible: false });

  _onToggleSnackBar = () => this.setState(state => ({ snackVisible: !state.snackVisible }));
  _onDismissSnackBar = () => this.setState({ snackVisible: false });

  isSaveable(isSave){
    let dummyState = {
      snackVisible: false,
      snackMessage:'',
      liveemail:''
    };

    let isBool = true;

    // if (this.state.buyerEmail === '') {
    //   isBool = false;
    // }
    if (this.state.liveemail === '') {
      isBool = false;
    }
    // if (this.state.price === null) {
    //     isBool = false;
    // }

    if (isSave){
      if (isBool){
        database()
        .ref("liveRequests")
        .push()
        .set(
          {
            buyerId: this.props.products.userObj.uid,
            buyerEmail: this.props.products.userObj.email,
            sellerId: this.state.sellerId,
            sellerEmail: this.state.liveemail,
            // productId: this.props.navigation.state.params.product.id,
            // productName: this.props.navigation.state.params.product.name,
            // price: this.state.price,
            status: 'REQUESTED'
            // review: this.state.review,
            // sellerId: this.props.products.userObj.uid 
           })
        this.setState({ snackMessage: "Request sent successfully." })
        this._onToggleSnackBar()
        this.setState({
          snackVisible: false,
          snackMessage:'',
          liveemail:''
        })

      } else {
        this.setState({ snackMessage: "Please fill all the fields." })
        // if (this.state.category === 'NONE') {
        //   this.setState({ snackMessage: "Please choose a category." })
        // }
        this._onToggleSnackBar()
      }
    }

    return isBool;
  }

  // checkAndSet(price){
  //   if (isNaN(parseInt(price))){
  //     console.log('not int');
  //     this.setState({ snackMessage: "Please enter a numerical value" })
  //     this._onToggleSnackBar()
  //   } else {
  //     this.setState({ price })
  //   }
  // }

  ratingCompleted(rating) {
      this.setState({rating:rating});
    // console.log("Rating is: " + rating)
  }

  getUidByEmail(useremail){
    this.props.products.dbh.ref('users/').orderByChild('email').equalTo(useremail).once("value", function(snapshot) {
        // console.log(snapshot.val().key();
  
        snapshot.forEach(function(data) {
            console.log(data.key);
            // this.setState({productID:'wow'});
            this.setState({sellerId:data.key.toString()});
            console.log(">>>>>>>>>>> "+this.state.sellerId);
        }.bind(this));
    }.bind(this));
    return useremail;
  }

  checkAndSet(price){
    if (isNaN(parseInt(price))){
      console.log('not int');
      this.setState({ snackMessage: "Please enter a numerical value" })
      this._onToggleSnackBar()
    } else {
      this.setState({ price })
    }
  }

  render() {
    console.log('AddLiveRequest')

    // const product = this.props.navigation.state.params.product;

    // const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
    // const [value, onChangeText] = React.useState('Useless Placeholder');
    // const BackIcon = <Icon
    //             name='clear'
    //             color='#fff'
    //             type='material'
    //             onPress={() => this.props.navigation.navigate('home')} />
    // const TitleView = <View style={{ flexDirection: 'row', justifyContent: 'space-between', width:100 }}>
    //                       <Text>Add Product</Text>
    //                   </View>
    return (
      <View style={styles.container}>
      {/* <View > */}
      <Snackbar
          visible={this.state.snackVisible}
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
        {this.state.snackMessage}
      </Snackbar>
      <ScrollView>
            {/*<Text style={ProductStyles.headerText}>{product.name}</Text>
            <Text style={ProductStyles.categoryText}>{product.category}</Text>
            <Text style={ProductStyles.priceText}>{product.price} Price</Text>
            <Divider style={ProductStyles.dividerStyle} />
        */}
            <TextInput
              selectionColor='#6600ff'
              // mode='outlined'
              label='User E-mail'
              value={this.state.liveemail}
              onChangeText={liveemail => this.setState({liveemail: this.getUidByEmail(liveemail)})}
              style={{marginVertical:'2%'}}
            />
            <Divider style={ProductStyles.dividerStyle} />
            
            <View style={{justifyContent: 'center', flexDirection:'row'}}>
              <Button 
                // icon="cancel" 
                mode="contained" 
                color="#6600ff"
                style={{marginVertical:'3%', marginHorizontal:'2%', width:'40%'}}
                onPress={() => this.props.navigation.goBack()}>
                  Discard
              </Button>
              <Button 
                // icon="plus" 
                mode="contained"
                color="#6600ff"
                style={{marginVertical:'3%', marginHorizontal:'2%', width:'40%'}} 
                onPress={() => this.isSaveable(true)}>
                  Add              
              </Button>
            </View>
          </ScrollView>
          
          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
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
    toggleImageFilter,
    initiateProducts
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SendOffer);