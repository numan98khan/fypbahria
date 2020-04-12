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

import ScreenOne from '../screens/Products';
// import ScreenTwo from '../screens/Cart';
// import BottomTabNavigator from './BottomTabNavigator';
import Category from '../screens/Category';
import AddProduct from '../screens/Products/AddProduct';
import LiveStream from '../screens/LiveStream';
import Credit from '../screens/Credit';
import Hire from '../screens/Hire';
import Reviews from '../screens/Reviews';
import EditProduct from '../screens/Products/EditProduct';
import Statistics from '../screens/Statistics';
import ProductDetails from '../screens/Products/ProductDetails';

import AddCategory from '../screens/Category/AddCategory';
import detailsCategory from '../screens/Category/CategoryDetails';
import ReviewDetails from '../screens/Reviews/ReviewDetails';
import AddReview from '../screens/Reviews/AddReview';

import HireDetails from '../screens/Hire/HireDetails';
import AddHire from '../screens/Hire/AddHire';

import drawerContentComponents from './drawerContentComponents'
import CategoryDetails from '../screens/Category/CategoryDetails';


import { reviewStack, hireStack, categoryStack, productStack, liveStack } from './SellerStacks';


const sellerDrawer = createDrawerNavigator({
    Products: productStack,
    Category: categoryStack,
    Reviews: reviewStack,
    Live: liveStack,
    Statistics: {
        screen: Statistics,
    },
    Hire: hireStack,
    Credit: {
        screen: Credit,
    },
},{
    drawerWidth:250,
    drawerType:'slide',
    initialRouteName:'Credit',
    // initialRouteName:'Products',
    // initialRouteName:'Reviews',
    // initialRouteName:'Hire',
    // initialRouteName:'Statistics',
    // initialRouteName:'Live',
    contentComponent: drawerContentComponents,
    
    // The drawer menu will be added throough here (thorugh component just like NavBar)
    // https://medium.com/@arunkmoury/customize-drawer-of-react-navigation-like-champ-9b42df489d42
    // contentComponent : DrawerMenu

});

const Seller = createSwitchNavigator(
    {
        loading: Loading,
        signup: SignUp,
        login: Login,
        home: sellerDrawer,
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


// export const BuyerNav = createAppContainer(Buyer);
const container = createAppContainer(Seller);
export default container;


