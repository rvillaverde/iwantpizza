import Link from 'next/link'
import styled from 'styled-components'

const LogoImage = styled.img`
  height: auto;
  width: ${ (props) => props.home ? '24rem' : '20rem' };
  padding: ${ (props) => props.home ? '2rem' : '1rem' };
`

export default function Logo({ home, name }) {
  return (
    <Link as="/" href="/">
      <a href="/">
        <LogoImage src="/images/logo.svg" home={home} alt={name} />
      </a>
    </Link>
  )
}
