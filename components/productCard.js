import Link from 'next/link'
import Button from './button'
import Price from './price'

import utilStyles from '../styles/utils.module.scss'
import cardStyles from '../styles/cards.module.scss'

export default function ProductCard({ product }) {
  return (
    <li className={cardStyles.card} key={product.id}>
      <Link href="/products/[id]" as={`/products/${product.id}`}>
        <a>
          <div className={cardStyles.cardMedia} style={{ backgroundImage: `url(${product.photo_url})` }}></div>
          <div className={cardStyles.cardPrimary}>
            <h3 className={cardStyles.cardTitle}>{ product.name }</h3>
            <p className={`${cardStyles.cardText} ${utilStyles.lightText}`}>
              { product.description }
            </p>
          </div>
        </a>
      </Link>
      <div className={cardStyles.cardActions}>
        <Price product={product} />
        <Button href='#' label='Add to cart' size="small" />
      </div>
    </li>
  )
}
