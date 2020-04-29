import { getProduct } from '../../lib/products'

//Action Types
export const ADD_TO_CART = "ADD_TO_CART";
export const ADDED_TO_CART = "ADDED_TO_CART";

export const addToCart = (data) => {
  return dispatch => {
    getProduct(data.id)
      .then(product => dispatch({ type: ADDED_TO_CART, product }))
   }
};

export const addedToCart = (data) => ({
  type: ADDED_TO_CART,
  id: data.id
});
