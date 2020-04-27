import styles from './price.module.scss'

const currencySymbol = {
  dollar: '$',
  euro: '€'
}

export default function Price({ className, product }) {
  const price = product.price.toFixed(2)
  const currency = product.currency ? currencySymbol[currency] : currencySymbol.dollar
  return (
    <span className={`${className} ${styles.price}`}>{currency} {price}</span>
  )
}
