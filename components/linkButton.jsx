import Link from 'next/link'
import { BasicButton, SecondaryButton } from './buttons'

export default function LinkButton(props) {
  return (
    <Link href={ props.href } as={props.href}>
      { props.secondary
      ?
      <SecondaryButton as="a" href={props.href} id={props.id}>
        {props.children}
      </SecondaryButton>
      :
      <BasicButton as="a" href={props.href} id={props.id}>
        {props.children}
      </BasicButton>
      }
    </Link>
  )
}