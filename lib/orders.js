import fetch from 'node-fetch'

const apiUrl = 'https://iwantpizzaapi.herokuapp.com/orders';
// const apiUrl = 'http://localhost:8080/orders';

async function createOrder(order) {
  const res = await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(order),
    headers: { 'Content-Type': 'application/json' }
  });

  return await res.json()
}

async function getOrders() {
  const res = await fetch(apiUrl)
  order.products.forEach(product => {
    product.quantity = product.order_product.quantity
  });
  return await res.json();
}

async function getOrder(id) {
  const res = await fetch(`${ apiUrl }/${ id }`)
  const order = await res.json()

  order.products.forEach(product => {
    product.quantity = product.order_product.quantity
  });

  return order;
}

export { createOrder, getOrders, getOrder }