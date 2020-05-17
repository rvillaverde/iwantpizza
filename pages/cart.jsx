import React from 'react';
import {connect} from 'react-redux';
import {addedToCart, updateCartItem, deleteCartItem} from '../redux/actions/cartActions';

import Layout from '../components/layout'
import CartTable from '../components/cartTable'
import LinkButton from '../components/linkButton'

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
            <LinkButton href="/" secondary>
              Continue shopping
            </LinkButton>
            <LinkButton href="/checkout">
              Checkout
            </LinkButton>
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
