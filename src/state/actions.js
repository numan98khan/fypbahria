import {INITIATE_PRODUCTS, UPDATE_PRODUCTS} from './TYPES'

// Responsible for first get from db
export const initiateProducts = productsSettings => (
   {
     type: INITIATE_PRODUCTS,
     payload: productsSettings,
   }
 );

 export const updateProducts = productsSettings => (
   {
     type: UPDATE_PRODUCTS,
     payload: productsSettings,
   }
 );