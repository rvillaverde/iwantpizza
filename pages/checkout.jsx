import React from 'react';
import {connect} from 'react-redux';
import Router from 'next/router'

import {checkout, changeCurrency} from '../redux/actions/cartActions';

import { BasicButton, SecondaryButton } from '../components/buttons'
import CartTable from '../components/cartTable'
import Layout from '../components/layout'
import { CardLarge } from '../components/card'

import formStyles from '../styles/forms.module.scss'
import utilStyles from '../styles/utils.module.scss'
import getShippingFee from '../lib/shipping';
import { createOrder } from '../lib/orders';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { postalCode: undefined, shippingFee: 0, loading: false }
    this.newOrder = this.newOrder.bind(this);
    this.calculateShipping = this.calculateShipping.bind(this);
    this.toggleShippingButton = this.toggleShippingButton.bind(this);
  }

  toggleShippingButton(e) {
    this.setState({ postalCode: e.target.value })
  }
  
  async calculateShipping(e) {
    e.preventDefault();
    let shippingFee = await getShippingFee(this.state.postalCode)
    this.setState({ shippingFee: shippingFee.fee })
  }

  async newOrder(e) {
    e.preventDefault()
    this.setState({ loading: true })
    const formData = new FormData(e.target)
    const order = { customer: {} }
    order.currency = this.props.currency
    order.products = this.props.cart.items.map((item) => ({ id: item.product_id, quantity: item.quantity, price: item.price }))
    for (let entry of formData.entries()) {
      order.customer[entry[0]] = entry[1]
    }

    let orderId = (await createOrder(order)).order_id;
    this.props.checkout();

    Router.push(`/orders/${orderId}`);
  }

  render() {
    return (
      <Layout>
        <div className={utilStyles.container}>
          <CardLarge>
            <CartTable products={ this.props.cart.items } shippingFee={ this.state.shippingFee }></CartTable>
          </CardLarge>

          <CardLarge>
            <form id="orderForm" onSubmit={this.newOrder}>
              <div className={formStyles.formTitle}>
                <h2 className={`${utilStyles.colorPrimary700} ${utilStyles.headingMd}`}>Personal information</h2>
              </div>
              <div className={formStyles.fieldSet}>
                <div className={formStyles.formField}>
                  <input className={formStyles.textField} type="text" name="first_name" placeholder="First Name" required />
                </div>
                <div className={formStyles.formField}>
                  <input className={formStyles.textField} type="text" name="last_name" placeholder="Last Name" required />
                </div>
              </div>
              <div className={formStyles.fieldSet}>
                <div className={formStyles.formField}>
                  <input className={formStyles.textField} type="email" name="email" placeholder="Email" required />
                </div>
                <div className={formStyles.formField}>
                  <input className={formStyles.textField} type="phone" name="phone" placeholder="Phone" required />
                </div>
              </div>
              <div className={formStyles.formTitle}>
                <h2 className={`${utilStyles.colorPrimary700} ${utilStyles.headingMd}`}>Shipping information</h2>
              </div>
              <div className={formStyles.fieldSet}>
                <div className={formStyles.formField}>
                  <input className={formStyles.textField} type="text" name="address_line_1" placeholder="Address" required />
                </div>
                <div className={`${formStyles.formField} ${formStyles.small}`}>
                  <input className={`${formStyles.textField} ${formStyles.small}`} 
                    type="text" name="address_line_2" placeholder="Appartment, suite, etc" />
                </div>
                <div className={`${formStyles.formField} ${formStyles.small}`}>
                  <input className={`${formStyles.textField} ${formStyles.small}`} type="text" name="postal_code" placeholder="Zip code" required 
                    onChange={this.toggleShippingButton}/>
                </div>
              </div>
            </form>
          </CardLarge>
          <div className={utilStyles.formActions}>
            <SecondaryButton type="button" id="shipping-button" onClick={this.calculateShipping} disabled={!this.state.postalCode}>
              Calculate shipping
            </SecondaryButton>
            <BasicButton type="submit" form="orderForm" disabled={this.state.loading}>
              Confirm
            </BasicButton>
          </div>
        </div>
      </Layout>
    );
  }
}


const mapStateToProps = state => ({
  cart: state.cart,
  currency: state.cart.currency
});

const mapDispatchToProps = {
  checkout: checkout,
  changeCurrency: changeCurrency
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
