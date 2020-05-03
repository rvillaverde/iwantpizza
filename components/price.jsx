import styles from './price.module.scss'
import React from 'react';
import {connect} from 'react-redux';
import {changeCurrency} from '../redux/actions/cartActions';

const currencies = {
  usd: { symbol: 'US$', rate: 1 },
  eur: { symbol: '€', rate: 0.9 }
}

class Price extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const price = this.props.quantity 
                  ? this.props.price * this.props.currency.rate * this.props.quantity
                  : this.props.price * this.props.currency.rate
    return (
      <span className={`${this.props.className} ${styles.price}`}>{this.props.currency.symbol} { price.toFixed(2) }</span>
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