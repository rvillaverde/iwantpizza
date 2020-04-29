import { ADD_TO_CART, ADDED_TO_CART, UPDATE_CART_ITEM, DELETE_CART_ITEM } from '../actions/cartActions';

const cartReducer = (state = { items: [] }, action) => {
  let productId;

  switch (action.type) {
    case ADD_TO_CART:
      return {...state};
    case (ADDED_TO_CART):
      productId = action.product.id
      if (!state.items.filter((item) => item.id === productId).length) {
        action.product.quantity = 0;
        state.items.push(action.product);
      }
      state.items.find((item) => item.id === productId).quantity++;
      return {...state};
    case (UPDATE_CART_ITEM):
      productId = action.id
      let quantity = action.quantity
      state.items.find((item) => item.id === productId).quantity = quantity;
      return {...state};
    case DELETE_CART_ITEM:
      productId = action.id
      state.items = state.items.filter((item) => item.id != productId);
      return {...state};
    default:
      return state;
  }
};

export default cartReducer;
