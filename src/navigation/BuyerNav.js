// import {createStackNavigator} from 'react-navigation-stack';
import {createNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import React, { Component } from "react";

import { Header, Icon, ButtonGroup } from 'react-native-elements';

import SignUp from '../screens/SignUp'
import Login from '../screens/Login'
import Main from '../screens/Products'
// import LiveStream from '../screens/LiveStream'
import Loading from '../screens/Loading';
// import { createBottomTabNavigator } from 'react-navigation-tabs';

// import ScreenTwo from '../screens/Cart';
// import BottomTabNavigator from './BottomTabNavigator';
import LiveStream from '../screens/LiveStream';
import Credit from '../screens/Credit';
import Statistics from '../Buyer/Statistics';


import drawerContentComponents from './drawerContentComponents'
import CategoryDetails from '../screens/Category/CategoryDetails';



import { reviewStack, cartStack, categoryStack, 
    productStack, offerStack, liveStack } from './BuyerStacks';


const buyerDrawer = createDrawerNavigator({
    Products: productStack,
    Cart: cartStack,
    // Cart: {
    //     screen: Credit,
    // },
    Offers: offerStack,
    Reviews: reviewStack,
    Live: liveStack,
    Statistics: {
        screen: Statistics,
    },
    // Hire: hireStack,
    // Credit: {
    //     screen: Credit,
    // },
},{
    drawerWidth:250,
    drawerType:'slide',
    // initialRouteName:'Offers',
    // initialRouteName:'Cart',
    initialRouteName:'Products',
    // initialRouteName:'Reviews',
    // initialRouteName:'Hire',
    // initialRouteName:'Statistics',
    // initialRouteName:'Live',
    contentComponent: drawerContentComponents,
    
    // The drawer menu will be added throough here (thorugh component just like NavBar)
    // https://medium.com/@arunkmoury/customize-drawer-of-react-navigation-like-champ-9b42df489d42
    // contentComponent : DrawerMenu

});

const Buyer = createSwitchNavigator(
    {
        loading: Loading,
        signup: SignUp,
        login: Login,
        home: buyerDrawer,
        // editor: EditProduct,
    },
    {
        initialRouteName:'loading'
    },
    {
        navigationOptions: {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#000',
            },
        },
    }
);

// var Home;
// if ( this.props.products.appMode === 'Seller' ) {
//     Home = Seller;
// } else {
//     Home = Buyer;
// }




// export default connect(mapStateToProps, mapDispatchToProps)(createAppContainer(Home));

const container = createAppContainer(Buyer);
export default container;
