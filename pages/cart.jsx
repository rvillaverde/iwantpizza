import React from 'react';
import {connect} from 'react-redux';
import {addedToCart, updateCartItem, deleteCartItem} from '../redux/actions/cartActions';

import Layout from '../components/layout'
import CartTable from '../components/cartTable'
import Button from '../components/button'

import cardStyles from '../styles/cards.module.scss'
import utilStyles from '../styles/utils.module.scss'

class Cart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <div className={utilStyles.container}>
          <div className={cardStyles.cardLarge}>
            <CartTable products={ this.props.cart.items } editable cart></CartTable>
          </div>
          <div className={utilStyles.formActions}>
            <Button size="medium" href="/" secondary>
              Continue shopping
            </Button>
            <Button size="medium" href="/checkout">
              Checkout
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

const mapDispatchToProps = {
  addedToCart: addedToCart,
  updateCartItem: updateCartItem,
  deleteCartItem: deleteCartItem
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
