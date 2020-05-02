import Link from 'next/link'
import styles from './button.module.scss'

const sizes = {
  small: styles.smallButton,
  medium: styles.mediumButton,
  large: styles.largeButton
}

export default function Button({ id, href, type, form, children, size, onClick, icon, secondary, disabled }) {
  if (href) {
    return (
      <Link href="[href]" as={href}>
        <a id={id} className={`${styles.basicButton} ${sizes[size]} ${icon ? styles.iconButton : ''} ${secondary ? styles.secondaryButton : ''}`}>
          {children}
        </a>
      </Link>
    )
  } else {
    return (
      <button id={id} type={type} form={form} disabled={disabled ? true : false}
        className={`${styles.basicButton} ${sizes[size]} ${icon ? styles.iconButton : ''} ${secondary ? styles.secondaryButton : ''}`}
        onClick={onClick}>
        {children}
      </button>
    )
  }
}
