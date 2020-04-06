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
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native'

import {Snackbar, TextInput, Card, Avatar, Button, Dialog, Portal, Title,List, Checkbox , Paragraph  } from 'react-native-paper';

import { Header, Icon, ButtonGroup, Divider, Rating, AirbnbRating, ListItem } from 'react-native-elements';
import ProductStyles from '../../common/productStyle';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateProducts, initiateProducts,
  toggleFilter, updateCategory, updateScreenVar } from '../../state/actions';

import NavBar from '../../navigation/navBar'

class Statistics extends React.Component {
  state = { 
    currentUser: null,
    totalSession: 163  
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

  componentDidMount() {
    // this.props.updateScreenVar({screen:'reviews'});

    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction()
    })
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
return (
    <View>
      <NavBar/>
      <ScrollView>
      <Card style={styles.firstCardContainer}>
        <Card.Title title="Sales" titleStyle={styles.purpDreams} subtitle="Last Week" />
        <Card.Content style={{paddingBottom:'1%'}}>
          <Text style={{fontSize:40, color:'#b380ff'}}>2,409 Rs.</Text>
        </Card.Content>
      </Card>

      <Card style={styles.cardContainer}>
        <Card.Title title="Product Views" titleStyle={styles.purpDreams} subtitle="Weekly" />
        <Card.Content style={{paddingBottom:'1%'}}>
          <Text style={{fontSize:40, color:'#b380ff'}}>45</Text>
        </Card.Content>
      </Card>

      <Card style={styles.cardContainer}>
        <Card.Title title="World Domination" titleStyle={styles.purpDreams} subtitle="Audience" />
        <Card.Content>
          <View style={{justifyContent: 'center', flexDirection:'row'}}>
            <Text style={{marginVertical:'1%', marginHorizontal:'2%', width:'56%', fontSize:11}}>
                Country
            </Text>
            <Text style={{marginVertical:'1%', marginHorizontal:'2%', width:'18%', fontSize:11}}>
                Sessions
            </Text>
            <Text style={{marginVertical:'1%', marginHorizontal:'2%', width:'18%', fontSize:11}}>
              Total %
            </Text>
            
          </View>
          <Divider style={{ 
            backgroundColor: '#6600ff', 
              marginVertical:'1%',
            }} />

            {
              // list.map((l, i) => (
              list.map((l, i) => (
                <View>
                <View style={{justifyContent: 'center', flexDirection:'row'}}>
                  <Text style={{color:"#6600ff", marginVertical:'1%', marginHorizontal:'2%', width:'56%', fontSize:11}}>
                      {l.country}
                  </Text>
                  <Text style={{color:"#6600ff", marginVertical:'1%', marginHorizontal:'2%', width:'18%', fontSize:11}}>
                      {l.sessions}
                  </Text>
                  <Text style={{color:"#6600ff", marginVertical:'1%', marginHorizontal:'2%', width:'18%', fontSize:11}}>
                      {this.getPercentage(l.sessions)}%
                  </Text>
                  
                </View>
                <Divider style={{ 
                  backgroundColor: '#6600ff', 
                    marginVertical:'1%',
                    height:3,
                    marginRight: String(100-this.getPercentage(l.sessions))+'%'
                  }} />
                </View>
              ))
            }
        </Card.Content>
      </Card>

      <Card style={styles.cardContainer}>
        <Card.Title title="Top 3 Users" titleStyle={styles.purpDreams}/>
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