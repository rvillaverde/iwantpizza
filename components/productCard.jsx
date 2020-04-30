import React from 'react';
import {connect} from 'react-redux';
import {addToCart} from '../redux/actions/cartActions';

import Link from 'next/link'
import Button from './button'
import Price from './price'

import utilStyles from '../styles/utils.module.scss'
import cardStyles from '../styles/cards.module.scss'

// export default function ProductCard({ product }) {
//   return (
//     <li className={cardStyles.card} key={product.id}>
//       <Link href="/products/[id]" as={`/products/${product.id}`}>
//         <a>
//           <div className={cardStyles.cardMedia} style={{ backgroundImage: `url(${product.photo_url})` }}></div>
//           <div className={cardStyles.cardPrimary}>
//             <h3 className={cardStyles.cardTitle}>{ product.name }</h3>
//             <p className={`${cardStyles.cardText} ${utilStyles.lightText}`}>
//               { product.description }
//             </p>
//           </div>
//         </a>
//       </Link>
//       <div className={cardStyles.cardActions}>
//         <Price product={product} />
//         <Button href='#' label='Add to cart' size="small" />
//       </div>
//     </li>
//   )
// }

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const product = this.props.product;
    return (
      <li className={cardStyles.card} key={product.id}>
        <Link href="/products/[id]" as={`/products/${product.id}`}>
          <a>
            <div className={cardStyles.cardMedia} style={{ backgroundImage: `url(${product.photo_url})` }}></div>
            <div className={cardStyles.cardPrimary}>
              <h3 className={`${utilStyles.headingMd} ${cardStyles.cardTitle}`}>{ product.name }</h3>
              <p className={`${utilStyles.caption} ${utilStyles.lightText}`}>
                { product.description }
              </p>
            </div>
          </a>
        </Link>
        <div className={cardStyles.cardActions}>
          <Price product={product} />
          <Button size="small" onClick={() => this.props.addToCart(product.id) }>
            Add to cart
          </Button>
        </div>
      </li>
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