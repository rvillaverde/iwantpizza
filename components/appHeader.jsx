import styled from "styled-components";
import Link from 'next/link'
import Logo from './logo'

import styles from './appHeader.module.scss'

const CartIcon = () =>
  <svg x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24">
  <path fill="#FFFFFF" d="M15.8,16.3c-4,0-8,0-12,0c-0.2,0-0.3,0-0.4-0.3c-1.1-3.2-2.1-6.4-3.2-9.6C0.1,5.9,0,5.4,0,4.8
      c0-0.2,0-0.4,0-0.6c6.5,0,12.9,0,19.3,0c0-0.1,0.1-0.2,0.1-0.4c0.2-0.8,0.4-1.6,0.6-2.3c0.3-1,1-1.5,2-1.5c0.6,0,1.2,0,1.8,0
      c0.1,0,0.1,0,0.2,0c0,0.5,0,1,0,1.5c-0.7,0-1.3,0-2,0c-0.3,0-0.4,0.1-0.5,0.4c0,0.1,0,0.1-0.1,0.2c-1.1,4.3-2.2,8.6-3.3,12.8
      c-0.4,1.4-0.6,2.8-1.2,4.1c1.4,1.1,1.3,2.8,0.6,3.8c-0.8,1.1-2.2,1.5-3.4,0.9c-0.6-0.3-1.1-0.7-1.4-1.3c-0.4-0.8-0.4-1.6,0-2.5
      c-1.5,0-3,0-4.5,0c0,0,0,0,0,0c0,0.1,0,0.1,0.1,0.2c0.4,1,0.2,2-0.5,2.8c-0.7,0.8-1.6,1.1-2.7,0.9c-1.4-0.2-2.4-1.5-2.3-3
      c0.1-1.4,1.3-2.5,2.8-2.5c3.1,0,6.1,0,9.2,0c0.5,0,0.8-0.2,1-0.7c0.2-0.5,0.3-1,0.4-1.5C16,16.3,15.9,16.3,15.8,16.3z M2.1,7
      c0.8,2.5,1.7,5.1,2.5,7.6c0.1,0.2,0.1,0.2,0.3,0.2c3.8,0,7.6,0,11.4,0c0.2,0,0.3-0.1,0.3-0.2c0.7-2.9,1.5-5.7,2.2-8.6
      c0-0.1,0-0.1,0-0.2c-5.7,0-11.5,0-17.2,0C1.8,6.2,1.9,6.6,2.1,7z M4.4,21.3c0,0.7,0.6,1.2,1.2,1.2c0.7,0,1.3-0.6,1.3-1.2
      c0-0.7-0.6-1.2-1.2-1.2C4.9,20,4.3,20.6,4.4,21.3z M13.9,21.2c0,0.7,0.6,1.2,1.3,1.2c0.7,0,1.2-0.6,1.2-1.2c0-0.7-0.6-1.2-1.3-1.2
      C14.5,20,13.9,20.5,13.9,21.2z"/>
  </svg>;

import React from 'react';
import {connect} from 'react-redux';
import {addedToCart} from '../redux/actions/cartActions';

class AppHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className={styles.header}>
      <nav className={styles.appNav}>
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
    counter: Object.keys(state.cart.items).length
  }
}

const mapDispatchToProps = {
  addedToCart: addedToCart
};
// const mapDispatchToProps = (dispatch)=>{
//   return {
//     addedToCart: (id)=>{dispatch(addedToCart(id))}
//   }
// }

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);

