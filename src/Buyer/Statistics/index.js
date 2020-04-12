const list = [
  {
    country: 'Pakistan',
    sessions: 83,
  },
  {
    country: 'US',
    sessions: 11,
  },
  {
    country: 'Australia',
    sessions: 69,
  },
]

import React from 'react'
import { StyleSheet, Platform, Image, Text, View, ScrollView, Dimensions } from 'react-native'

import {Snackbar, TextInput, Card, Avatar, Button, Dialog, Portal, Title,List, Checkbox , Paragraph  } from 'react-native-paper';

import { Header, Icon, ButtonGroup, Divider, Rating, AirbnbRating, ListItem } from 'react-native-elements';
import ProductStyles from '../../common/productStyle';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateProducts, initiateProducts,
  toggleFilter, updateCategory, updateScreenVar } from '../../state/actions';

import NavBar from '../../navigation/navBar'
import database from '@react-native-firebase/database';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

class Statistics extends React.Component {
  state = { 
    currentUser: null,
    totalSession: 163,
    orderList: [],
    totalSpending: 0,
  }

  onFocusFunction = () => {
    // do some stuff on every screen focus
    this.props.updateScreenVar({screen:'statistics'});
    console.log("statistics focused");
  }

  // and don't forget to remove the listener
  componentWillUnmount () {
    this.focusListener.remove()
  }

  countTotalSpending(){
    var i;

    var totalSum = 0;
    for (i = 0; i < this.state.orderList.length; i++) {
      totalSum += this.state.orderList[i].bill;
    }  

    this.setState({ totalSpending: totalSum });
    // console.log(totalSum);
  }

  orderProducts(){
    for (i = 0; i < this.state.orderList.length; i++) {
      // console.log(this.state.orderList[i].productList);
      // totalSum += this.state.orderList[i].bill;
      // id = 12;
      // var count = this.state.orderList[i].filter((obj) => obj.id === id).length;
      // console.log(count);
    }

    
    const id = 12;
    const count = array.filter((obj) => obj.id === id).length;
  }

  componentDidMount() {
    // this.props.updateScreenVar({screen:'reviews'});

    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction()
    })

    // database().ref('/').child('orders').orderByChild('buyerId').equalTo(this.props.products.userObj.uid).once("value", function(snapshot) {
    database().ref('/').child('orders').orderByChild('buyerId').equalTo('uHrYlhp39KS7Bsl5FYsSQzm9m8x2').once("value", function(snapshot) {
        // uHrYlhp39KS7Bsl5FYsSQzm9m8x2  
      // console.log(snapshot);
        var orderList = [];
        snapshot.forEach(function(data) {
          orderList.push(data.val());
        }.bind(this));
        this.setState({orderList: orderList});
        this.countTotalSpending();
        this.orderProducts();
        // console.log(orderList)
    }.bind(this));    

    // console.log(this.state.fetchedReviews);

    // connect to a Firebase table
    //  var dbref = this.props.products.dbh.ref('products');
    // save database reference for later
    //  this.props.products.setState ( {dbulref: dbref});
    // meat: this is where it all happens
    //  dbref.on('value', (e) => {
        // var rows = [];
        // eJSON = e.toJSON()
        // for(var i in eJSON){
        //   rows.push(eJSON[i]);
        // }
        // var ds = rows;

    //  });

  }

  getPercentage(count){
    // total = 163
    return Math.round(((count/this.state.totalSession)*100) * 10) / 10
  }



render() {
    const { currentUser } = this.state
    const data = {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43]
        }
      ]
    };
    return (
    <View>
      <NavBar/>
      <ScrollView>
      <Card style={styles.firstCardContainer}>
        <Card.Title title="Sales" titleStyle={styles.purpDreams} subtitle="All Time" />
        <Card.Content style={{paddingBottom:'1%'}}>
          <Text style={{fontSize:40, color:'#b380ff'}}>{this.state.totalSpending} Rs.</Text>
        </Card.Content>
      </Card>

      <Card style={styles.cardContainer}>
        <Card.Title title="Product Views" titleStyle={styles.purpDreams} subtitle="Weekly" />
        <Card.Content style={{paddingBottom:'1%'}}>
          <BarChart
            data={{
              labels: [
                'January',
                'February',
                'March',
                'April',
              ],
              datasets: [
                {
                  data: [20, 45, 28, 40],
                },
              ],
            }}
            width={Dimensions.get('window').width*0.81}
            // width={'80%'}
            height={200}
            // yAxisLabel={'Rs'}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#f0e6ff',
              backgroundGradientTo: '#f0e6ff',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(102, 0, 255, ${opacity})`,
              style: {
                borderRadius: 30,
                // padding:50
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 10,
            }}
          />
        </Card.Content>
      </Card>

      <Card style={styles.cardContainer}>
        <Card.Title title="Top 3 Products" titleStyle={styles.purpDreams}/>
        <Card.Content>
        {
          // list.map((l, i) => (
          list.map((l, i) => (
            <ListItem
                containerStyle={{width:'100%'}}
                key={i}
                // leftAvatar={{ source: { uri: l.avatar_url } }}
                leftAvatar={{ source: { uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" } }}
                title={l.country}
                titleStyle={{color:"#6600ff"}}
                // bottomDivider
                // chevron={myMenu}
              />
          ))
        }
        </Card.Content>
      </Card>

      <Card style={styles.cardContainer}>
        <Card.Title title="Bumper" titleStyle={styles.purpDreams}/>
        <Card.Content>
        
        </Card.Content>
      </Card>

      </ScrollView>
      

    </View>
    )
  }
}
const styles = StyleSheet.create({
  cardContainer: {
    margin:'5%',
    marginVertical:'2.5%'
  },
  firstCardContainer: {
    margin:'5%',
    marginVertical:'2.5%',
    marginTop:'5%'
  },
  
  purpDreams: {
    color:"#6600ff"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

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
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);