import React from 'react';

import { getProducts } from '../../lib/products'
import Layout from '../../components/layout'
import ProductList from '../../components/productList'
import { CardLarge } from '../../components/card'

import utilStyles from '../../styles/utils.module.scss'

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
          <CardLarge>
            <ProductList products={ this.props.products } />
          </CardLarge>
        </div>
      </Layout>
    );
  }
}

export default ProductIndex;
