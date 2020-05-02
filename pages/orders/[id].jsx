import React from 'react';

import { getOrder } from '../../lib/orders'
import Layout from '../../components/layout'
import CartTable from '../../components/cartTable'

import utilStyles from '../../styles/utils.module.scss'
import cardStyles from '../../styles/cards.module.scss'

class OrderDetail extends React.Component {
  static async getInitialProps ({ store, query }) {
    const order = await getOrder(query.id)
    return { order }
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout home>
        <div className={utilStyles.mainHeadingWrapper} style={{ backgroundImage: "url('/images/pizza-background.jpg')" }}>
          <h2 className={`${utilStyles.headingXl} ${utilStyles.mainHeading}`}>Thank you for your purchase!</h2>
        </div>
        <div className={`${utilStyles.container}`}>
          <section className={`${utilStyles.flexWrapper}`}>
            <div className={cardStyles.cardLarge}>
              <CartTable products={ this.props.order.products }></CartTable>
            </div>
            <div className={`${cardStyles.cardLarge} ${utilStyles.customerInfo}`}>
              <h3 className={`${utilStyles.headingMd} ${utilStyles.colorPrimary700}`}>{this.props.order.customer.first_name} {this.props.order.customer.last_name}</h3>
              <p className={`${utilStyles.body} ${utilStyles.lightText}`}>{this.props.order.customer.email}</p>
              <p className={`${utilStyles.body} ${utilStyles.lightText}`}>{this.props.order.customer.phone}</p>
              <br/>
              <h4 className={`${utilStyles.headingSm} ${utilStyles.colorPrimary700}`}>Shipping Address</h4>
              <p className={`${utilStyles.body} ${utilStyles.lightText}`}>{this.props.order.customer.address_line_1} {this.props.order.customer.address_line_2}</p>
              <p className={`${utilStyles.body} ${utilStyles.lightText}`}>{this.props.order.customer.postal_code}, Magical mystery Place</p>
            </div>
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

export default OrderDetail;
