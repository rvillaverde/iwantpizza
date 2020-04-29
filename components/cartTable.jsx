import React from 'react';
import {connect} from 'react-redux';
import {addToCart, updateCartItem, deleteCartItem} from '../redux/actions/cartActions';

import styled from "styled-components";

import Link from 'next/link'
import Button from './button'
import Price from './price'
import {DeleteIcon} from './icons'

import styles from './cartTable.module.scss'
import productStyles from './product.module.scss'
import cardStyles from '../styles/cards.module.scss'
import utilStyles from '../styles/utils.module.scss'

const StyledPrice = styled(Price)`
  color: #999;
`;

class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  updateProductQuantity(data) {
    this.props.updateCartItem(data.id, Number(data.quantity))
  }

  render() {
    return (
      <table className={styles.cartTable}>
        <thead>
          <tr>
            <td colSpan='6'>
              <h2 className={`${utilStyles.headingLg} ${utilStyles.colorPrimary700}`}>Shopping cart</h2>
            </td>
          </tr>
        </thead>
        <tbody>
          {this.props.products.map(product => (
            <tr key={product.id}>
              <td width="10%">
                <Link href="/products/[id]" as={`/products/${product.id}`}>
                  <a className={styles.thumb}>
                    <img className={styles.tumbImage} src={product.photo_url} alt={product.name} />
                  </a>
                </Link>
              </td>
              <td>
                <Link href="/products/[id]" as={`/products/${product.id}`}>
                  <a>
                    <h3 className={productStyles.productTitle}>{product.name}</h3>
                  </a>
                </Link>
                <p className={`${utilStyles.lightText} ${productStyles.productDescription}`}>{product.description}</p>
              </td>
              <td>
                <StyledPrice product={product} />
              </td>
              <td width="10%">
                <input type="number" defaultValue={product.quantity} className={styles.productQuantity}
                  onBlur={(e) => this.updateProductQuantity({ id: product.id, quantity: e.target.value })} />
              </td>
              <td>
                <Price className={utilStyles.lightText} product={product} total />
              </td>
              <td width="5%">
                <Button size="small" icon onClick={() => this.props.deleteCartItem(product.id) }>
                  <DeleteIcon />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan='4'>
              <p className={`${utilStyles.headingMd} ${utilStyles.colorPrimary700}`}>Subtotal</p>
            </td>
            <td colSpan='2'>
              <Price className={utilStyles.lightText} product={{price: this.props.subtotal}} />
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

const mapStateToProps = state => ({
  subtotal: state.cart.items.reduce((total, item) => (total + item.price * item.quantity), 0)
});

const mapDispatchToProps= (dispatch) => {
  return {
    addToCart: (id) => { dispatch(addToCart(id)) },
    updateCartItem: (id, quantity) => { dispatch(updateCartItem(id, quantity)) },
    deleteCartItem: (id) => { dispatch(deleteCartItem(id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);