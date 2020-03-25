import {createSwitchNavigator, createStackNavigator, createDrawerNavigator, StackNavigator, TabNavigator, DrawerNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import SignUp from '../screens/SignUp'
import Login from '../screens/Login'
import Main from '../screens/Home'
// import LiveStream from '../screens/LiveStream'
import Loading from '../screens/Loading';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import ScreenOne from '../screens/Home';
import ScreenTwo from '../screens/Cart';
// import BottomTabNavigator from './BottomTabNavigator'
import AddProduct from '../screens/AddProducts'

const BottomTabAdder = createBottomTabNavigator(
    {
        Shop: ScreenOne,
        Cart: ScreenTwo
    }
);

// Makes this drawer
const BottomTabNavigator = createBottomTabNavigator(
    {
    Shop: ScreenOne,
    Cart: ScreenTwo,
    // addpage: BottomTabAdder
  }
  );



const Home = createStackNavigator(
    {
        loading: Loading,
        signup: SignUp,
        login: Login,
        main: Main,
        // addpage: BottomTabAdder,
        // livestream: LiveStream,
        home: BottomTabNavigator,
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

// const Home = DrawerNavigator({
//     Home: {
//       screen: Login,
//     }
//   });

const container = createAppContainer(Home);
// const container = createAppContainer(RootNavigator);

export default container;

// const DrawerNavigator = createDrawerNavigator({
//     /*To have a header on the drawer screens, 
//           there must be a navigator that includes the screen you want to add to the drawer navigator.
//           See 'screen-stack-navigator' file*/
//     Home: Loading,
//     // Settings: SettingsNavigator
//   });
  
//   const Drawer = createAppContainer(DrawerNavigator);
  
//   export default Drawer;