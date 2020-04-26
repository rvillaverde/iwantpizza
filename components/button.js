import Link from 'next/link'
import styles from './button.module.scss'

const sizes = {
  small: styles.smallButton,
  medium: styles.mediumButton,
  large: styles.largeButton
}

export default function Button({ href, label, size }) {
  return (
    <Link href="[href]" as={href}>
      <a className={`${styles.basicButton} ${sizes[size]}`}>{label}</a>
    </Link>
  )
}