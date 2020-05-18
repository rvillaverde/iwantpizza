import React from 'react';
import {connect} from 'react-redux';
import {changeCurrency} from '../../redux/actions/cartActions';

import { getOrder } from '../../lib/orders'
import Layout from '../../components/layout'
import CartTable from '../../components/cartTable'
import { CardLarge } from '../../components/card'

import utilStyles from '../../styles/utils.module.scss'

class OrderDetail extends React.Component {
  static async getInitialProps ({ store, query }) {
    const order = await getOrder(query.id)
    return { order }
  }
  
  constructor(props) {
    super(props);
    this.props.changeCurrency(this.props.order.currency)
  }

  render() {
    console.log(this.props.order)
    return (
      <Layout home>
        <div className={utilStyles.mainHeadingWrapper} style={{ backgroundImage: "url('/images/pizza-background.jpg')" }}>
          <h2 className={`${utilStyles.headingXl} ${utilStyles.mainHeading}`}>Thank you for your purchase!</h2>
        </div>
        <div className={`${utilStyles.container}`}>
          <section className={`${utilStyles.flexWrapper}`}>
            <CardLarge>
              <CartTable products={ this.props.order.products } shippingFee={ this.props.order.shipping_fee } order={this.props.order}></CartTable>
            </CardLarge>
            <CardLarge className={utilStyles.customerInfo}>
              <h3 className={`${utilStyles.headingMd} ${utilStyles.colorPrimary700}`}>{this.props.order.customer.first_name} {this.props.order.customer.last_name}</h3>
              <p className={`${utilStyles.body} ${utilStyles.lightText}`}>{this.props.order.customer.email}</p>
              <p className={`${utilStyles.body} ${utilStyles.lightText}`}>{this.props.order.customer.phone}</p>
              <br/>
              <h4 className={`${utilStyles.headingSm} ${utilStyles.colorPrimary700}`}>Shipping Address</h4>
              <p className={`${utilStyles.body} ${utilStyles.lightText}`}>{this.props.order.customer.address_line_1} {this.props.order.customer.address_line_2}</p>
              <p className={`${utilStyles.body} ${utilStyles.lightText}`}>{this.props.order.customer.postal_code}, Magical mystery Place</p>
            </CardLarge>
          </section>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    currency: state.cart.currency
  }
}

const mapDispatchToProps = {
  changeCurrency: changeCurrency
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
