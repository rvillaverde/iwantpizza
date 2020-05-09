import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store'

import Price from "./price";

const mockStore = configureMockStore([])

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders the price in USD", () => {
  const store = mockStore({ cart: { currency: 'usd' }})
  act(() => {
    render(
      <Provider store={store}>
        <Price price={1} />
      </Provider>
    , container)
  });

  expect(container.textContent).toBe("US$ 1.00");
});

it("renders the price multiplied by its quantity in USD", () => {
  const store = mockStore({ cart: { currency: 'usd' }})
  act(() => {
    render(
      <Provider store={store}>
        <Price price={1} quantity={2} />
      </Provider>
    , container)
  });

  expect(container.textContent).toBe("US$ 2.00");
});

it("renders the price in euro", () => {
  const store = mockStore({ cart: { currency: 'eur' }})
  act(() => {
    render(
      <Provider store={store}>
        <Price price={1} />
      </Provider>
    , container)
  });

  expect(container.textContent).toBe("€ 0.90");
});

it("renders the price multiplied by its quantity in USD", () => {
  const store = mockStore({ cart: { currency: 'eur' }})
  act(() => {
    render(
      <Provider store={store}>
        <Price price={1} quantity={2} />
      </Provider>
    , container)
  });

  expect(container.textContent).toBe("€ 1.80");
});
