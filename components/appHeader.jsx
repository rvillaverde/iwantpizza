import React from 'react';
import {connect} from 'react-redux';
import {addedToCart} from '../redux/actions/cartActions';

import Link from 'next/link'
import Logo from './logo'
import {CartIcon} from './icons'

import styles from './appHeader.module.scss'

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

