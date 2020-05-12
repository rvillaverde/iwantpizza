import fetch from 'node-fetch'

const apiUrl = 'https://iwantpizzaapi.herokuapp.com/products';
// const apiUrl = 'http://localhost:8080/products';

export async function getProducts() {
  const res = await fetch(apiUrl)
  return res.json();
}

export async function getProduct(id) {
  const res = await fetch(`${ apiUrl }/${ id }`)
  return res.json();
}

export async function createProduct(data) {
  const res = await fetch(apiUrl, {
    method: 'POST',
    body: data
  });
  return res.json();
}

export async function editProduct(data) {
  const res = await fetch(`${ apiUrl }/edit`, {
    method: 'POST',
    body: data
  });
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${ apiUrl }/${ id }/delete`, {
    method: 'POST'
  });
  return res.status;

}