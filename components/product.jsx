import styled from "styled-components";

import Link from 'next/link'
import Button from './button'
import Price from './price'

import utilStyles from '../styles/utils.module.scss'
import styles from './product.module.scss'

const StyledPrice = styled(Price)`
  display: block;
  font-size: 2rem;
  margin: 1rem 0;
`;

export default function Product({ product }) {
  return (
    <div className={styles.productWrapper}>
      <div className={styles.productImage} style={{ backgroundImage: `url(${product.photo_url})` }}></div>
      <div className={styles.productInfo}>
        <h1 className={styles.productTitle}>{product.name}</h1>
        <p className={`${utilStyles.lightText} ${styles.productDescription}`}>{product.description}</p>
        <StyledPrice product={product} />
        <Button href='#' label='Add to cart' size="medium" />
      </div>
    </div>
  )
}
