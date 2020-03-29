import {INITIATE_PRODUCTS, UPDATE_PRODUCTS, 
  TOGGLE_FILTER_OVERLAY, TOGGLE_IMAGE_OVERLAY, 
  UPDATE_CATEGORY, UPDATE_SCREEN_VAR} from './TYPES'

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

 export const toggleFilter = productsSettings => (
  {
    type: TOGGLE_FILTER_OVERLAY,
    payload: productsSettings,
  });

 export const toggleImageFilter = productsSettings => (
    {
      type: TOGGLE_IMAGE_OVERLAY,
      payload: productsSettings,
    }
);

export const updateCategory = productsSettings => (
  {
    type: UPDATE_CATEGORY,
    payload: productsSettings,
  }
);

export const updateScreenVar = productsSettings => (
  {
    type: UPDATE_SCREEN_VAR,
    payload: productsSettings,
  }
);