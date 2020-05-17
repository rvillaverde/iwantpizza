import React from 'react';
import {connect} from 'react-redux';
import {addToCart, updateCartItem, deleteCartItem} from '../redux/actions/cartActions';

import styled from "styled-components";

import Link from 'next/link'
import { IconButton } from './buttons'
import { Table, THead, TBody, TFoot, Tr, Td, NumberColumn, DescriptionColumn, ImageColumn } from './table'
import Price from './price'
import {DeleteIcon} from './icons'

import styles from './cartTable.module.scss'
import utilStyles from '../styles/utils.module.scss'

const StyledPrice = styled(Price)`
&& {
  color: #999;
}
`;

class CartTable extends React.Component {
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
      <Table>
        <THead>
          <Tr>
            <Td colSpan='6'>
              <h2 className={`${utilStyles.headingMd} ${utilStyles.colorPrimary700}`}>{ this.props.cart ? 'Shopping cart' : 'Your order' }</h2>
            </Td>
          </Tr>
        </THead>
        <TBody>
          {products.map(product => (
            <Tr key={product.product_id}>
              { this.props.editable &&
                <Td width="1%">
                  <IconButton type="button" onClick={() => this.props.deleteCartItem(product.product_id) }>
                    <DeleteIcon />
                  </IconButton>
                </Td>
              }
              <ImageColumn width="10%">
                <Link href="/products/[id]" as={`/products/${product.product_id}`}>
                  <a className={styles.thumb}>
                    <img className={styles.tumbImage} src={product.photo_url} alt={product.name} />
                  </a>
                </Link>
              </ImageColumn>
              <DescriptionColumn>
                <Link href="/products/[id]" as={`/products/${product.product_id}`}>
                  <a>
                    <h3 className={`${utilStyles.headingMd} ${utilStyles.colorPrimary500}`}>{product.name}</h3>
                  </a>
                </Link>
                <p className={`${utilStyles.lightText} ${utilStyles.caption}`}>{product.description}</p>
              </DescriptionColumn>
              <NumberColumn>
                <StyledPrice price={product.price} />
              </NumberColumn>
              <NumberColumn width="10%">
                { this.props.editable 
                  ? <input type="number" defaultValue={product.quantity} className={styles.productQuantity}
                      onKeyUp={(e) => this.updateProductQuantity({ product_id: product.product_id, quantity: e.target.value })} />
                  : <span className={utilStyles.body}>{product.quantity}</span>
                }
              </NumberColumn>
              <NumberColumn>
                <Price price={product.price} quantity={product.quantity} />
              </NumberColumn>
            </Tr>
          ))}
        </TBody>
        <TFoot>
          <Tr>
            <NumberColumn colSpan={this.props.editable ? 5 : 4}>
              <p className={`${utilStyles.headingMd} ${utilStyles.colorPrimary700}`}>Cart total</p>
            </NumberColumn>
            <NumberColumn colSpan='1'>
              <Price price={subtotal} />
            </NumberColumn>
          </Tr>
          { !this.props.editable && 
            <React.Fragment>
              <Tr>
                <NumberColumn colSpan={4}>
                  <p className={`${utilStyles.headingMd} ${utilStyles.colorPrimary700}`}>Shipping fee</p>
                </NumberColumn>
                <NumberColumn colSpan='1'>
                  <Price price={shippingFee} />
                </NumberColumn>
              </Tr>
              <Tr>
                <NumberColumn colSpan={4}>
                  <p className={`${utilStyles.headingMd} ${utilStyles.colorPrimary700}`}>Total</p>
                </NumberColumn>
                <NumberColumn colSpan='1'>
                  <Price price={ shippingFee + subtotal } />
                </NumberColumn>
              </Tr>
            </React.Fragment>
          }
        </TFoot>
      </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(CartTable);
