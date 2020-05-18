import React from 'react';

import { getProducts } from '../lib/products'
import Layout from '../components/layout'
import ProductCard from '../components/productCard'
import { CardWrapper } from '../components/card'
import utilStyles from '../styles/utils.module.scss'

class Home extends React.Component {
  static async getInitialProps ({ store }) {
    const products = await getProducts();
    return { products }
  }

  constructor(props) {
    super(props);
  }

  render() {
    const products = this.props.products;
    return (
      <Layout home>
        <div className={utilStyles.mainHeadingWrapper} style={{ backgroundImage: "url('/images/pizza-background.jpg')" }}>
          <h2 className={`${utilStyles.headingXl} ${utilStyles.mainHeading}`}>Check out our pizzas!</h2>
        </div>
        <div className={utilStyles.container}>
          <section className={`${utilStyles.headingMd}`}>
            <CardWrapper as="ul">
              {products.map(product => (
                <ProductCard product={product} key={product.product_id}/>
              ))}
            </CardWrapper>
          </section>
        </div>
      </Layout>
    );
  }
}

export default Home;
