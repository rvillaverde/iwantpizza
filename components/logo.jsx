import Link from 'next/link'
import styled from 'styled-components'

const LogoImage = styled.img`
  height: auto;
  width: ${ (props) => props.home ? '20rem' : '18rem' };
  padding-bottom: ${ (props) => props.home ? '2rem' : '0' };
  padding-top: 2rem;
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
