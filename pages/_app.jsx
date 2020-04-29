import '../styles/global.scss'

// export default function App({ Component, pageProps }) {
// return <Component {...pageProps} />
// }

import App from 'next/app';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import React from 'react';
import withRedux from "next-redux-wrapper";
import { store, persistor } from '../redux/store';
import { REHYDRATE } from 'redux-persist';

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
