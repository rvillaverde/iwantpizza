import React from 'react';
import {connect} from 'react-redux';
import {addToCart} from '../redux/actions/cartActions';

import styled from "styled-components";

import Button from './button'
import Price from './price'

import utilStyles from '../styles/utils.module.scss'
import cardStyles from '../styles/cards.module.scss'

import styles from './product.module.scss'

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
    const product = this.props.product;
    return (
      <div className={`${cardStyles.cardLarge} ${styles.productWrapper}`}>
      <div className={styles.productImage} style={{ backgroundImage: `url(${product.photo_url})` }}></div>
      <div className={styles.productInfo}>
        <h1 className={styles.productTitle}>{product.name}</h1>
        <p className={`${utilStyles.lightText} ${styles.productDescription}`}>{product.description}</p>
        <StyledPrice product={product} />
        <Button label='Add to cart' size="medium" onClick={() => this.props.addToCart(product.id) }>
          Add to cart
        </Button>
      </div>
    </div>
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