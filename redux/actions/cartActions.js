import { getProduct } from '../../lib/products'

//Action Types
export const ADD_TO_CART = "ADD_TO_CART";
export const ADDED_TO_CART = "ADDED_TO_CART";
export const UPDATE_CART_ITEM = "UDPATE_CART_ITEM";
export const DELETE_CART_ITEM = "DELETE_CART_ITEM";
export const CHECKOUT = "CHECKOUT";

export const addToCart = (id) => {
  return dispatch => {
    getProduct(id)
      .then(product => dispatch(addedToCart(product)))
   }
};

export const addedToCart = (product) => ({
  type: ADDED_TO_CART,
  product: product
});

export const updateCartItem = (id, quantity) => ({
  type: UPDATE_CART_ITEM,
  product_id: id,
  quantity: quantity
});

export const deleteCartItem = (id) => ({
  type: DELETE_CART_ITEM,
  product_id: id
});

export const checkout = () => ({
  type: CHECKOUT
});
