import fetch from 'node-fetch'

const apiUrl = 'https://iwantpizzaapi.herokuapp.com/shipping';

export default async function getShippingFee(postalCode) {
  const res = await fetch(`${apiUrl}?postal_code=${postalCode}`)
  return res.json();
}
