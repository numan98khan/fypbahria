// import {createStackNavigator} from 'react-navigation-stack';
import {createNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
// import { createStackNavigator } from 'react-navigation-stack';

import SignUp from '../screens/SignUp'
import Login from '../screens/Login'
import Main from '../screens/Products'
// import LiveStream from '../screens/LiveStream'
import Loading from '../screens/Loading';
// import { createBottomTabNavigator } from 'react-navigation-tabs';

import ScreenOne from '../screens/Products';
import ScreenTwo from '../screens/Cart';
// import BottomTabNavigator from './BottomTabNavigator'
import Category from '../screens/Category'

// const BottomTabAdder = createBottomTabNavigator(
//     {
//         Shop: ScreenOne,
//         Cart: ScreenTwo
//     }
// );

// Makes this drawer
const homeDrawer = createDrawerNavigator({
    Products: {
      screen: ScreenOne,
    },
    Cart: {
      screen: ScreenTwo,
    },
    Category: {
      screen: Category,
    }
},{
    drawerWidth:250,
    drawerType:'slide',
    
    // The drawer menu will be added throough here (thorugh component just like NavBar)
    // https://medium.com/@arunkmoury/customize-drawer-of-react-navigation-like-champ-9b42df489d42
    // contentComponent : DrawerMenu

});


const Home = createSwitchNavigator(
    {
        loading: Loading,
        signup: SignUp,
        login: Login,
        // main: Main,
        // addpage: BottomTabAdder,
        // livestream: LiveStream,
        home: homeDrawer,
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