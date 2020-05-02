import fetch from 'node-fetch'

// const apiUrl = 'https://iwantpizzaapi.herokuapp.com/shipping';
const apiUrl = 'http://localhost:8080/shipping';

export default async function getShippingFee(postalCode) {
  const res = await fetch(`${apiUrl}?postal_code=${postalCode}`)
  return res.json();
}
