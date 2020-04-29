import { ADD_TO_CART, ADDED_TO_CART, addedToCart } from '../actions/cartActions';

const cartReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {...state};
    case (ADDED_TO_CART):
      let productId = action.product.id
      if (!state.items.filter((item) => item.id === productId).length) {
        action.product.quantity = 0;
        state.items.push(action.product);
      }
      state.items.find((item) => item.id === productId).quantity++;
      return {...state};
    default:
      return state;
  }
};

export default cartReducer;
