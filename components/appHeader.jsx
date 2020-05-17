import React from 'react'
import {connect} from 'react-redux'
import {addedToCart, changeCurrency} from '../redux/actions/cartActions'

import styled from 'styled-components'

import Link from 'next/link'
import { SmallButton } from './buttons'
import Logo from './logo'
import {CartIcon} from './icons'

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
      <Header>
      <AppNav>
        <HeaderSection>
          <SmallButton active={ this.props.currency === 'usd' } onClick={() => this.handleCurrencyChange('usd')}>
            US$
          </SmallButton>
          <SmallButton active={ this.props.currency === 'eur' } onClick={() => this.handleCurrencyChange('eur')}>
            €
          </SmallButton>
        </HeaderSection>
        <HeaderSection>
          <Link href="/cart" as={'/cart'}>
            <CartLink data-quantity={this.props.counter}>
              <i><CartIcon /></i>
            </CartLink>
          </Link>
        </HeaderSection>
      </AppNav>
      <Logo name={this.name} home={this.props.home}></Logo>
    </Header>
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

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const AppNav = styled.nav`
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.2);
  height: var(--header-height);
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  background-color: var(--primary-500);
  padding: 0 1rem;
  width: 100%;
  z-index: 24;

  button:not(:first-child) {
    margin-left: .2rem;
  }
`
const HeaderSection = styled.section`
  display: flex;

  &:last-child {
    margin-left: auto;
  }
`
const CartLink = styled.a`
  color:white;
  display: flex;
  align-items: center;
  position: relative;
  padding: .2rem .4rem;
  
  &::after {
    align-items: center;
    background-color: var(--primary-700);
    border-radius: 50%;
    bottom: 0;
    content: attr(data-quantity);
    display: flex;
    height: 20px;
    justify-content: center;
    font-size: .8rem;
    font-weight: 500;
    position: absolute;
    right: 0;
    width: 20px;
  }
  
  &[data-quantity='0']::after {
    content: unset;
  }
`
export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
