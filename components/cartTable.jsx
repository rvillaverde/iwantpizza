import React from 'react';
import {connect} from 'react-redux';
import {addToCart} from '../redux/actions/cartActions';

import styled from "styled-components";

import Link from 'next/link'
import Button from './button'
import Price from './price'

import styles from './cartTable.module.scss'
import productStyles from './product.module.scss'
import cardStyles from '../styles/cards.module.scss'
import utilStyles from '../styles/utils.module.scss'

const StyledPrice = styled(Price)`
  display: block;
  font-size: 2rem;
  margin: 1rem 0;
`;

class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table className={styles.cartTable}>
        {this.props.products.map(product => (
          <tr>
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
              {product.quantity}
            </td>
            <td>
              <Price product={product} />
            </td>
          </tr>
        ))}
      </table>
    );
  }
}

const mapStateToProps = state => ({
  counter: state.cart
});

const mapDispatchToProps= (dispatch) => {
  return {
    addToCart: (id) => { dispatch(addToCart(id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
