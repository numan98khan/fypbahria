// import {createStackNavigator} from 'react-navigation-stack';
import {createNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import SignUp from '../screens/SignUp'
import Login from '../screens/Login'
import Main from '../screens/Products'
// import LiveStream from '../screens/LiveStream'
import Loading from '../screens/Loading';
// import { createBottomTabNavigator } from 'react-navigation-tabs';

import ScreenOne from '../screens/Products';
import ScreenTwo from '../screens/Cart';
// import BottomTabNavigator from './BottomTabNavigator';
import Category from '../screens/Category';
import AddProduct from '../screens/AddProduct';
import LiveStream from '../screens/LiveStream';
import Credit from '../screens/Credit';
import Hire from '../screens/Hire';
import Reviews from '../screens/Reviews';
import EditProduct from '../screens/EditProduct';
import Statistics from '../screens/Statistics';

// The main drawer
const homeDrawer = createDrawerNavigator({
    Products: {
      screen: ScreenOne,
    },
    Category: {
        screen: Category,
    },
    Reviews: {
        screen: Reviews,
    },
    Live: {
        screen: LiveStream,
    },
    Statistics: {
        screen: Statistics,
    },
    Hire: {
        screen: Hire,
    },
    Credit: {
        screen: Credit,
    },
},{
    drawerWidth:250,
    drawerType:'slide',
    // initialRouteName:'Category',
    initialRouteName:'Products',
    
    // The drawer menu will be added throough here (thorugh component just like NavBar)
    // https://medium.com/@arunkmoury/customize-drawer-of-react-navigation-like-champ-9b42df489d42
    // contentComponent : DrawerMenu

});


// Add this stack to your switch stack
const adderStack = createStackNavigator(
    {
        addProduct: {
            screen:AddProduct,
            navigationOptions: {
                headerShown: false,
            },
        }
    }
);

const editorStack = createStackNavigator(
    {
        editProduct: {
            screen:EditProduct,
            navigationOptions: {
                headerShown: false,
            },
        }
    }
);

const Home = createSwitchNavigator(
    {
        loading: Loading,
        signup: SignUp,
        login: Login,
        // main: Main,
        // addpage: BottomTabAdder,
        // livestream: LiveStream,
        home: homeDrawer,
        adder: adderStack,
        editor: editorStack
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