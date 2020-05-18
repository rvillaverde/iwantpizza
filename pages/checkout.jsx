import React from 'react';
import {connect} from 'react-redux';
import Router from 'next/router'

import {checkout, changeCurrency} from '../redux/actions/cartActions';

import { BasicButton, SecondaryButton } from '../components/buttons'
import CartTable from '../components/cartTable'
import Layout from '../components/layout'
import { CardLarge } from '../components/card'
import { FormTitle, FieldSet, FormField, SmallFormField, FormInput } from '../components/form'

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
              <FormTitle>
                <h2 className={`${utilStyles.colorPrimary700} ${utilStyles.headingMd}`}>Personal information</h2>
              </FormTitle>
              <FieldSet>
                <FormField>
                  <FormInput type="text" name="first_name" placeholder="First Name" required />
                </FormField>
                <FormField>
                  <FormInput type="text" name="last_name" placeholder="Last Name" required />
                </FormField>
              </FieldSet>
              <FieldSet>
                <FormField>
                  <FormInput type="email" name="email" placeholder="Email" required />
                </FormField>
                <FormField>
                  <FormInput type="phone" name="phone" placeholder="Phone" required />
                </FormField>
              </FieldSet>
              <FormTitle>
                <h2 className={`${utilStyles.colorPrimary700} ${utilStyles.headingMd}`}>Shipping information</h2>
              </FormTitle>
              <FieldSet>
                <FormField>
                  <FormInput type="text" name="address_line_1" placeholder="Address" required />
                </FormField>
                <SmallFormField>
                  <FormInput type="text" name="address_line_2" placeholder="Appartment, suite, etc" />
                </SmallFormField>
                <SmallFormField>
                  <FormInput type="text" name="postal_code" placeholder="Zip code" required 
                    onChange={this.toggleShippingButton}/>
                </SmallFormField>
              </FieldSet>
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
