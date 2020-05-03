import fetch from 'node-fetch'

const apiUrl = 'https://iwantpizzaapi.herokuapp.com/products';

export async function getProducts() {
  const res = await fetch(apiUrl)
  return res.json();
}

export async function getProduct(id) {
  const res = await fetch(`${ apiUrl }/${ id }`)
  return res.json();
}
