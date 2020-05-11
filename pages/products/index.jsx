import React from 'react';

import { getProducts } from '../../lib/products'
import Layout from '../../components/layout'
import ProductList from '../../components/productList'
import utilStyles from '../../styles/utils.module.scss'
import cardStyles from '../../styles/cards.module.scss'

class ProductIndex extends React.Component {
  static async getInitialProps ({ store }) {
    const products = await getProducts();
    return { products }
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <div className={utilStyles.container}>
          <div className={cardStyles.cardLarge}>
            <ProductList products={ this.props.products } />
          </div>
        </div>
      </Layout>
    );
  }
}

export default ProductIndex;
