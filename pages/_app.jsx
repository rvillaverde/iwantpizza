import App from 'next/app';
import React from 'react';
import {Provider} from 'react-redux';
import withRedux from "next-redux-wrapper";
import { store, persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { REHYDRATE } from 'redux-persist';

import '../styles/global.scss'

class MyApp extends App {
  static async getInitialProps({Component, ctx}) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return {pageProps: pageProps};
 }

 componentDidMount() {
  persistor.dispatch({ type: REHYDRATE });
}

  render() {
    const {Component, pageProps, store} = this.props;
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps}/>
        </PersistGate>
      </Provider>
    );
  }
}

const makeStore = () => store;

export default withRedux(makeStore)(MyApp);
