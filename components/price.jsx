import React from 'react';
import {connect} from 'react-redux';
import {changeCurrency} from '../redux/actions/cartActions';
import styled from "styled-components";

const currencies = {
  usd: { symbol: 'US$', rate: 1 },
  eur: { symbol: '€', rate: 0.9 }
}

const MyPrice = styled.span`
  color: var(--primary-700);
  font-weight: 700;

  @media (max-width: 840px) {
    font-size: 0.9rem;
  }
`

class Price extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const price = this.props.quantity >= 0
                  ? this.props.price * this.props.currency.rate * this.props.quantity
                  : this.props.price * this.props.currency.rate
    return (
      <MyPrice className={ this.props.className }>{this.props.currency.symbol} { price.toFixed(2) }</MyPrice>
    );
  }
}

const mapStateToProps = state => ({
  currency: state.cart.currency ? currencies[state.cart.currency] : currencies.usd
});

const mapDispatchToProps= (dispatch) => {
  return {
    changeCurrency: changeCurrency
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Price);
