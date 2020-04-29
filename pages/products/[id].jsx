import Head from 'next/head'
import { getProduct } from '../../lib/products'
import Layout from '../../components/layout'
import Product from '../../components/product'
import utilStyles from '../../styles/utils.module.scss'
import React from 'react';
// import {connect} from 'react-redux';
// import {addToCart} from '../../redux/actions/cartActions';

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

// const mapStateToProps = state => ({
//   cart: state.cart
// });

// const mapDispatchToProps = {
//   addToCart: addToCart
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
