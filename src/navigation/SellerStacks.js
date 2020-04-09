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

import LiveRequestList from '../screens/LiveStream/LiveRequestList';

import LiveProductList from '../screens/LiveStream/LiveProducts';

import LiveStream from '../screens/LiveStream';


console.log('component error '+LiveStream)
console.log('component error '+LiveRequestList)


export const liveStack = createStackNavigator(
    {
        LiveStreamSeller: {
            // screen: LiveRequestList,
            screen: LiveStream,
            navigationOptions: {
                headerShown: false,
            },
            
        },
        LiveRequestList: {
            screen: LiveRequestList,
            navigationOptions: {
                headerShown: false,
            },
            
        },
        LiveProductList: {
            screen: LiveProductList,
            navigationOptions: {
                headerShown: false,
            },
            
        },
        // addLiveRequest: {
        //     screen: RequestLive,
        //     navigationOptions: {
        //         headerShown: false,
        //     },
            
        // }
        
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
        initialRouteName:'LiveRequestList',
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
        addReview: {
            screen:AddReview,
            navigationOptions: {
                title:"Add Review",
                // headerShown: false,
            },
        },
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

export const hireStack = createStackNavigator(
    {
        Hire: {
            screen: Hire,
            navigationOptions: {
                headerShown: false,
            },
            
        },
        addHire: {
            screen:AddHire,
            navigationOptions: {
                title:"Hire",
                // headerShown: false,
            },
        },
        detailHire: {
            screen:HireDetails,
            navigationOptions: {
                title:"Hiring Status",
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

export const categoryStack = createStackNavigator(
    {
        Category: {
            screen: Category,
            navigationOptions: {
                headerShown: false,
            },
            
        },
        addCategory: {
            screen:AddCategory,
            navigationOptions: {
                title:"Add Category",
                // headerShown: false,
            },
        },
        detailCategory: {
            screen:CategoryDetails,
            navigationOptions: {
                title:"Category Details",
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
        editProduct: {
            screen:EditProduct,
            navigationOptions: {
                title:"Edit Product",
            },
        },
        addProduct: {
            screen:AddProduct,
            navigationOptions: {
                title:"Add Product",
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