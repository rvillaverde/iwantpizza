import React from 'react';
import Head from 'next/head'

import { getProduct } from '../../lib/products'

import Layout from '../../components/layout'
import Product from '../../components/product'

import utilStyles from '../../styles/utils.module.scss'

class ProductDetail extends React.Component {
  static async getInitialProps({ store, query }) {
    const product = await getProduct(query.id)
    return { product }
  }

  constructor(props) {
    super(props);
  }

  render() {
    const product = this.props.product;
    return (
      <Layout>
        <Head>
          <title>{product.name}</title>
        </Head>
        <div className={utilStyles.container}>
          <Product product={product}></Product>
        </div>
      </Layout>
    );
  }
}

export default ProductDetail;
