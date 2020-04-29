import React from 'react';

import { getProducts } from '../lib/products'
import Layout from '../components/layout'
import ProductCard from '../components/productCard'
import utilStyles from '../styles/utils.module.scss'
import cardStyles from '../styles/cards.module.scss'

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
          <h2 className={utilStyles.mainHeading}>Check out our pizzas!</h2>
        </div>
        <div className={utilStyles.container}>
          <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
            <ul className={cardStyles.cardWrapper}>
              {products.map(product => (
                <ProductCard product={product} key={product.id}/>
              ))}
            </ul>
          </section>
        </div>
      </Layout>
    );
  }
}

// const mapStateToProps = state => ({
//   cart: state.cart
// });

// const mapDispatchToProps = {
//   addToCart: addToCart
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Home);

export default Home;
