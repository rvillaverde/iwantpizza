import styles from './price.module.scss'

const currencySymbol = {
  dollar: '$',
  euro: '€'
}

export default function Price({ className, product, total }) {
  const price = total ? (product.price*product.quantity).toFixed(2) : product.price.toFixed(2)
  const currency = product.currency ? currencySymbol[currency] : currencySymbol.dollar
  return (
    <span className={`${className} ${styles.price}`}>{currency} {price}</span>
  )
}
