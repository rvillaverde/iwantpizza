import { ADD_TO_CART, ADDED_TO_CART, UPDATE_CART_ITEM, DELETE_CART_ITEM, CHECKOUT, CHANGE_CURRENCY } from '../actions/cartActions';

const cartReducer = (state = { currency: "usd", items: [] }, action) => {
  let productId;

  switch (action.type) {
    case ADD_TO_CART:
      return {...state};
    case (ADDED_TO_CART):
      productId = action.product.product_id
      if (!state.items.filter((item) => item.product_id === productId).length) {
        action.product.quantity = 0;
        state.items.push(action.product);
      }
      state.items.find((item) => item.product_id === productId).quantity++;
      return {...state};
    case (UPDATE_CART_ITEM):
      productId = action.product_id
      let quantity = action.quantity
      state.items.find((item) => item.product_id === productId).quantity = quantity;
      return {...state};
    case DELETE_CART_ITEM:
      productId = action.product_id
      state.items = state.items.filter((item) => item.product_id != productId);
      return {...state};
    case CHECKOUT: 
      state.items = state.items = [];
      return {...state};
    case CHANGE_CURRENCY: 
      state.currency = action.currency;
      return {...state};
    default:
      return state;
  }
};

export default cartReducer;
