import database from '@react-native-firebase/database';
import * as types from '../TYPES'
import { act } from 'react-test-renderer';

const ds = [];
const INITIAL_STATE = {
    loading: true, 
    dbh: database(),
    dataSourceSearch: ds,
    dataSourceFilter: ds,
    dataSourceDup: ds,
    dataCategoryDup: ds,
    dataCategorySearch: ds,
    search: '',
    isFilterOn: false,
    category: 'NONE',
    isFilterVisible: false,
    currentScreen:''
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.INITIATE_PRODUCTS:

        return Object.assign({}, state, {
            loading: action.payload.loading,
            dataSourceSearch: action.payload.dataSourceSearch,
            dataSourceFilter: action.payload.dataSourceFilter,
            dataSourceDup: action.payload.dataSourceDup,
        });
    case types.UPDATE_PRODUCTS:
        // getMethods = (obj) => Object.getOwnPropertyNames(obj).filter(item => typeof obj[item] === 'function')
        // console.log(getMethods(action.payload));
        var updateSend;

        if (action.payload.dataSourceSearch !== undefined) {
            updateSend = Object.assign({}, state, {
                dataSourceSearch: action.payload.dataSourceSearch,
            });
        } else if (action.payload.category !== undefined) {
            updateSend = Object.assign({}, state, {
                category: action.payload.category,
            });
            // console.log('category updated');
        }
        return updateSend
    case types.TOGGLE_FILTER_OVERLAY:
        var boolSet;
        if (state.isFilterOn){
            boolSet = false;
        } else {
            boolSet = true;
        }
        console.log("changeed")
        return Object.assign({}, state, {
            isFilterOn: boolSet,
        });
    case types.TOGGLE_IMAGE_OVERLAY:
            var boolSet;
            if (state.isFilterVisible){
                boolSet = false;
            } else {
                boolSet = true;
            }
            console.log("changeed")
            return Object.assign({}, state, {
                isFilterVisible: boolSet,
            });
    case types.UPDATE_CATEGORY:
        var updateSend;

        if (action.payload.dataCategoryDup !== undefined) {
            updateSend = Object.assign({}, state, {
                dataCategoryDup: action.payload.dataCategoryDup,
                dataCategorySearch: action.payload.dataCategorySearch,
            });
            console.log('category list initiated');
            console.log(action.payload.dataCategoryDup)
        } else if (action.payload.dataCategorySearch !== undefined) {
            updateSend = Object.assign({}, state, {
                dataCategorySearch: action.payload.dataCategorySearch,
            
            });
            console.log('category list updated');
        }
        return updateSend
    case types.UPDATE_SCREEN_VAR:
        return Object.assign({}, state, {
            currentScreen: action.payload.screen,
        });
    default:
      return state
  }
};

export default productReducer