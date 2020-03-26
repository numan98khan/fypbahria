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
    search: ''
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
        return Object.assign({}, state, {
            dataSourceSearch: action.payload.dataSourceSearch,
        });
    default:
      return state
  }
};

export default productReducer