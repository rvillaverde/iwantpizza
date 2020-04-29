import Link from 'next/link'
import styles from './button.module.scss'

const sizes = {
  small: styles.smallButton,
  medium: styles.mediumButton,
  large: styles.largeButton
}

export default function Button({ href, children, size, onClick, icon }) {
  if (href) {
    return (
      <Link href="[href]" as={href}>
        <a className={`${styles.basicButton} ${sizes[size]}`}>{children}</a>
      </Link>
    )
  } else {
      return (
        <a className={`${styles.basicButton} ${sizes[size]} ${icon ? styles.iconButton : ''}`} onClick={onClick}>{children}</a>
      )
    
  }
}