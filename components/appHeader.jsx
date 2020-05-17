import React from 'react';
import {connect} from 'react-redux';
import {addedToCart, changeCurrency} from '../redux/actions/cartActions';

import Link from 'next/link'
import { SmallButton, BasicButton } from './buttons'
import Logo from './logo'
import {CartIcon} from './icons'

import styles from './appHeader.module.scss'

class AppHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
  }

  handleCurrencyChange(currency) {
    this.props.changeCurrency(currency)
  }

  render() {
    return (
      <header className={styles.header}>
      <nav className={styles.appNav}>
        <div className={styles.leftSection}>
          <SmallButton active={ this.props.currency === 'usd' } 
            onClick={() => this.handleCurrencyChange('usd')}>
            US$
          </SmallButton>
          <SmallButton active={ this.props.currency === 'eur' } 
            onClick={() => this.handleCurrencyChange('eur')}>
            €
          </SmallButton>
        </div>
        <div className={styles.rightSection}>
          <Link href="/cart" as={'/cart'}>
            <a className={styles.cartLink} data-quantity={this.props.counter}>
              <i className={styles.icon}><CartIcon /></i>
            </a>
          </Link>
        </div>
      </nav>
      <Logo name={this.name} home={this.home}></Logo>
    </header>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    items: state.cart.items,
    counter: Object.keys(state.cart.items).length,
    currency: state.cart.currency
  }
}

const mapDispatchToProps = {
  addedToCart: addedToCart,
  changeCurrency: changeCurrency
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);

