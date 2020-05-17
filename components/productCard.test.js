import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store'

import ProductCard from "./productCard";

const mockStore = configureMockStore([])

jest.mock("./buttons", () => {
  return {
    SmallButton: (props) => {
      return (
        <div data-test-id="add-to-cart-button">
          {props.children}
        </div>
      );
    }
  }
});

jest.mock("./price", () => {
  return function DummyPrice(props) {
    return (
      <div data-test-id="price">
        {props.price}
      </div>
    );
  };
});

const product = {
  product_id: 1,
  name: 'Product name',
  description: 'Product description',
  price: 10,
  photo_url: 'Product photo url'
}

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

it("renders the product with the information", () => {
  const store = mockStore({ cart: { currency: 'usd' }})
  act(() => {
    render(
      <Provider store={store}>
        <ProductCard product={product} />
      </Provider>
    , container)
  });

  expect(container.querySelector('h3').textContent).toEqual(product.name);
  expect(container.querySelector('p').textContent).toEqual(product.description);
  expect(container.querySelector("[data-test-id='add-to-cart-button'").textContent).toEqual('Add to cart');
  expect(Number(container.querySelector("[data-test-id='price'").textContent)).toEqual(product.price);
});
