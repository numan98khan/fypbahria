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
    search: '',
    isFilterOn: false,
    category: 'NONE',
    isFilterVisible: false
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
            console.log('category updated');
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
    default:
      return state
  }
};

export default productReducer