import React from 'react';
import {connect} from 'react-redux';
import {addToCart, updateCartItem, deleteCartItem} from '../redux/actions/cartActions';

import styled from "styled-components";

import Link from 'next/link'
import Button from './button'
import Price from './price'
import {DeleteIcon} from './icons'

import styles from './cartTable.module.scss'
import utilStyles from '../styles/utils.module.scss'

const StyledPrice = styled(Price)`
  color: #999;
`;

class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  updateProductQuantity(data) {
    this.props.updateCartItem(data.product_id, Number(data.quantity))
  }

  render() {
    const products = this.props.order ? this.props.order.products : this.props.products;
    const subtotal = this.props.order ? this.props.order.subtotal : this.props.subtotal;
    const shippingFee = this.props.order ? this.props.order.shipping_fee : this.props.shippingFee;
    return (
      <table className={styles.cartTable}>
        <thead>
          <tr>
            <td colSpan='6'>
              <h2 className={`${utilStyles.headingMd} ${utilStyles.colorPrimary700}`}>{ this.props.cart ? 'Shopping cart' : 'Your order' }</h2>
            </td>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.product_id}>
              { this.props.editable &&
                <td width="1%">
                  <Button size="small" icon onClick={() => this.props.deleteCartItem(product.product_id) }>
                    <DeleteIcon />
                  </Button>
                </td>
              }
              <td className={styles.imageColumn} width="10%">
                <Link href="/products/[id]" as={`/products/${product.product_id}`}>
                  <a className={styles.thumb}>
                    <img className={styles.tumbImage} src={product.photo_url} alt={product.name} />
                  </a>
                </Link>
              </td>
              <td className={styles.descriptionColumn}>
                <Link href="/products/[id]" as={`/products/${product.product_id}`}>
                  <a>
                    <h3 className={`${utilStyles.headingMd} ${utilStyles.colorPrimary500}`}>{product.name}</h3>
                  </a>
                </Link>
                <p className={`${utilStyles.lightText} ${utilStyles.caption}`}>{product.description}</p>
              </td>
              <td className={styles.numberColumn}>
                <Price className={utilStyles.lightText} price={product.price} />
              </td>
              <td className={styles.numberColumn} width="10%">
                { this.props.editable 
                  ? <input type="number" defaultValue={product.quantity} className={styles.productQuantity}
                      onKeyUp={(e) => this.updateProductQuantity({ product_id: product.product_id, quantity: e.target.value })} />
                  : <span className={utilStyles.body}>{product.quantity}</span>
                }
              </td>
              <td className={styles.numberColumn}>
                <Price price={product.price} quantity={product.quantity} />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className={styles.numberColumn} colSpan={this.props.editable ? 5 : 4}>
              <p className={`${utilStyles.headingMd} ${utilStyles.colorPrimary700}`}>Cart total</p>
            </td>
            <td className={styles.numberColumn} colSpan='1'>
              <Price price={subtotal} />
            </td>
          </tr>
          { !this.props.editable && 
            <React.Fragment>
              <tr>
                <td className={styles.numberColumn} colSpan={4}>
                  <p className={`${utilStyles.headingMd} ${utilStyles.colorPrimary700}`}>Shipping fee</p>
                </td>
                <td className={styles.numberColumn} colSpan='1'>
                  <Price price={shippingFee} />
                </td>
              </tr>
              <tr>
                <td className={styles.numberColumn} colSpan={4}>
                  <p className={`${utilStyles.headingMd} ${utilStyles.colorPrimary700}`}>Total</p>
                </td>
                <td className={styles.numberColumn} colSpan='1'>
                  <Price price={ shippingFee + subtotal } />
                </td>
              </tr>
            </React.Fragment>
          }
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
