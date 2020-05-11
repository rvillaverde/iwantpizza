import Link from 'next/link'
import styles from './logo.module.scss'

export default function Product({ home, name }) {
  return (
    <Link href="/">
      <a>
        <img
          src="/images/logo.svg"
          className={home ? styles.homeHeaderImage : styles.headerImage}
          alt={name}
        />
      </a>
    </Link>
  )
}
