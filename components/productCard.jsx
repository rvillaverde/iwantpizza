import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';

import Link from 'next/link'
import { SmallButton } from './buttons'
import Price from './price'
import { Card, CardMedia, CardPrimary, CardTitle, CardActions } from './card'

import utilStyles from '../styles/utils.module.scss'

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const product = this.props.product;
    return (
      <Card as='li' key={product.product_id}>
        <Link href="/products/[id]" as={`/products/${product.product_id}`}>
          <a>
            <CardMedia style={{ backgroundImage: `url(${product.photo_url})` }}></CardMedia>
            <CardPrimary>
              <CardTitle className={ utilStyles.headingMd }>{ product.name }</CardTitle>
              <p className={`${ utilStyles.caption } ${ utilStyles.lightText }`}>
                { product.description }
              </p>
            </CardPrimary>
          </a>
        </Link>
        <CardActions>
          <Price price={product.price} />
          <SmallButton type="button" onClick={() => this.props.addToCart(product.product_id) }>
            Add to cart
          </SmallButton>
        </CardActions>
      </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);