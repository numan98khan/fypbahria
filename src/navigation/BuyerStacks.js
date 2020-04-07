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

import ScreenOne from '../Buyer/Products';
// import ScreenTwo from '../screens/Cart';
// import BottomTabNavigator from './BottomTabNavigator';
// import Category from '../screens/Category';
import AddProductReview from '../Buyer/Products/AddProductReview';
import SendOffer from '../Buyer/Products/SendOffer';
// import LiveStream from '../screens/LiveStream';
// import Credit from '../screens/Credit';
// import Hire from '../screens/Hire';
import Reviews from '../Buyer/Reviews';
import EditProduct from '../Buyer/Products/EditProduct';
// import Statistics from '../Buyer/Statistics';
import ProductDetails from '../Buyer/Products/ProductDetails';

// import AddCategory from '../Buyer/Category/AddCategory';
// import detailsCategory from '../screens/Category/CategoryDetails';
import ReviewDetails from '../Buyer/Reviews/ReviewDetails';
// import AddReview from '../Buyer/Reviews/AddReview';

// import HireDetails from '../screens/Hire/HireDetails';
// import AddHire from '../screens/Hire/AddHire';

// import drawerContentComponents from './drawerContentComponents'
// import CategoryDetails from '../screens/Category/CategoryDetails';
import Cart from '../Buyer/Cart';
import LiveStream from '../screens/LiveStream';
import Offer from '../Buyer/Offer';
import LiveList from '../screens/LiveStream/LiveList';

export const liveStack = createStackNavigator(
    {
        LiveStream: {
            screen: LiveStream,
            navigationOptions: {
                headerShown: false,
            },
            
        },
        LiveList: {
            screen: LiveList,
            navigationOptions: {
                headerShown: false,
            },
            
        },
        
        // detailProduct: {
        //     screen:ProductDetails,
        //     navigationOptions: {
        //         title:"Details",
        //     },
            
        // },
        // editProduct: {
        //     screen:EditProduct,
        //     navigationOptions: {
        //         title:"Edit Product",
        //     },
        // },
        // addProduct: {
        //     screen:AddProduct,
        //     navigationOptions: {
        //         title:"Add Product",
        //         // headerShown: false,
        //     },
        // }
    },
    {
        initialRouteName:'LiveList',
        defaultNavigationOptions: {
            header: ({ scene, previous, navigation }) => {
                const { options } = scene.descriptor;
                const title =
                  options.headerTitle !== undefined
                    ? options.headerTitle
                    : options.title !== undefined
                    ? options.title
                    : scene.route.routeName;
                // console.log(title)
              
                return (<Header backgroundColor="#6600ff"
                centerComponent={{ text: title, style: { color: '#fff', fontSize:24 } }}
                // leftContainerStyle={{width: 400}}
                // leftComponent={previous ? <Icon
                //         name="clear"
                //         color='#fff'
                //         onPress={navigation.goBack}
                //         iconStyle={styles.iconStyle} /> : undefined}
                >
              {/* <MyCustomLeftComponent />
              <MyCustomCenterComponent />
              <MyCustomRightComponent /> */}
              </Header>);
              }
        }
    }
);

export const offerStack = createStackNavigator(
    {
        Offer: {
            screen: Offer,
            navigationOptions: {
                headerShown: false,
            },
            
        },
        // detailProduct: {
        //     screen:ProductDetails,
        //     navigationOptions: {
        //         title:"Details",
        //     },
            
        // },
        // editProduct: {
        //     screen:EditProduct,
        //     navigationOptions: {
        //         title:"Edit Product",
        //     },
        // },
        // addProduct: {
        //     screen:AddProduct,
        //     navigationOptions: {
        //         title:"Add Product",
        //         // headerShown: false,
        //     },
        // }
    },
    {
        defaultNavigationOptions: {
            header: ({ scene, previous, navigation }) => {
                const { options } = scene.descriptor;
                const title =
                  options.headerTitle !== undefined
                    ? options.headerTitle
                    : options.title !== undefined
                    ? options.title
                    : scene.route.routeName;
                // console.log(title)
              
                return (<Header backgroundColor="#6600ff"
                centerComponent={{ text: title, style: { color: '#fff', fontSize:24 } }}
                // leftContainerStyle={{width: 400}}
                // leftComponent={previous ? <Icon
                //         name="clear"
                //         color='#fff'
                //         onPress={navigation.goBack}
                //         iconStyle={styles.iconStyle} /> : undefined}
                >
              {/* <MyCustomLeftComponent />
              <MyCustomCenterComponent />
              <MyCustomRightComponent /> */}
              </Header>);
              }
        }
    }
);

export const cartStack = createStackNavigator(
    {
        Cart: {
            screen: Cart,
            navigationOptions: {
                headerShown: false,
            },
            
        },
        // detailProduct: {
        //     screen:ProductDetails,
        //     navigationOptions: {
        //         title:"Details",
        //     },
            
        // },
        // editProduct: {
        //     screen:EditProduct,
        //     navigationOptions: {
        //         title:"Edit Product",
        //     },
        // },
        // addProduct: {
        //     screen:AddProduct,
        //     navigationOptions: {
        //         title:"Add Product",
        //         // headerShown: false,
        //     },
        // }
    },
    {
        defaultNavigationOptions: {
            header: ({ scene, previous, navigation }) => {
                const { options } = scene.descriptor;
                const title =
                  options.headerTitle !== undefined
                    ? options.headerTitle
                    : options.title !== undefined
                    ? options.title
                    : scene.route.routeName;
                // console.log(title)
              
                return (<Header backgroundColor="#6600ff"
                centerComponent={{ text: title, style: { color: '#fff', fontSize:24 } }}
                // leftContainerStyle={{width: 400}}
                // leftComponent={previous ? <Icon
                //         name="clear"
                //         color='#fff'
                //         onPress={navigation.goBack}
                //         iconStyle={styles.iconStyle} /> : undefined}
                >
              {/* <MyCustomLeftComponent />
              <MyCustomCenterComponent />
              <MyCustomRightComponent /> */}
              </Header>);
              }
        }
    }
);

export const reviewStack = createStackNavigator(
    {
        Reviews: {
            screen: Reviews,
            navigationOptions: {
                headerShown: false,
            },
            
        },
        // addReview: {
        //     screen:AddReview,
        //     navigationOptions: {
        //         title:"Add Review",
        //         // headerShown: false,
        //     },
        // },
        detailReview: {
            screen:ReviewDetails,
            navigationOptions: {
                title:"Review Details",
                // headerShown: false,
            },
        }
    },
    {
        defaultNavigationOptions: {
            header: ({ scene, previous, navigation }) => {
                const { options } = scene.descriptor;
                const title =
                    options.headerTitle !== undefined
                    ? options.headerTitle
                    : options.title !== undefined
                    ? options.title
                    : scene.route.routeName;
                // console.log(title)
                
                return (<Header backgroundColor="#6600ff"
                centerComponent={{ text: title, style: { color: '#fff', fontSize:24 } }}
                // leftContainerStyle={{width: 400}}
                // leftComponent={previous ? <Icon
                //         name="clear"
                //         color='#fff'
                //         onPress={navigation.goBack}
                //         iconStyle={styles.iconStyle} /> : undefined}
                >
                {/* <MyCustomLeftComponent />
                <MyCustomCenterComponent />
                <MyCustomRightComponent /> */}
                </Header>);
                }
        }
    }
);

export const productStack = createStackNavigator(
    {
        Products: {
            screen: ScreenOne,
            navigationOptions: {
                headerShown: false,
            },
            
        },
        detailProduct: {
            screen:ProductDetails,
            navigationOptions: {
                title:"Details",
            },
            
        },
        sendOffer: {
            screen:SendOffer,
            navigationOptions: {
                title:"Send Offer",
            },
        },
        addProductReview: {
            screen:AddProductReview,
            navigationOptions: {
                title:"Add Review",
                // headerShown: false,
            },
        }
    },
    {
        defaultNavigationOptions: {
            header: ({ scene, previous, navigation }) => {
                const { options } = scene.descriptor;
                const title =
                  options.headerTitle !== undefined
                    ? options.headerTitle
                    : options.title !== undefined
                    ? options.title
                    : scene.route.routeName;
                // console.log(title)
              
                return (<Header backgroundColor="#6600ff"
                centerComponent={{ text: title, style: { color: '#fff', fontSize:24 } }}
                // leftContainerStyle={{width: 400}}
                // leftComponent={previous ? <Icon
                //         name="clear"
                //         color='#fff'
                //         onPress={navigation.goBack}
                //         iconStyle={styles.iconStyle} /> : undefined}
                >
              {/* <MyCustomLeftComponent />
              <MyCustomCenterComponent />
              <MyCustomRightComponent /> */}
              </Header>);
              }
        }
    }
);