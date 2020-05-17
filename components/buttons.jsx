import styled from 'styled-components'

export const BasicButton = styled.button`
  transition: all .3s ease-in-out;
  border-radius: .2rem;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  display: block;
  user-select: none;
  text-align: center;
  width: fit-content;

  font-size: 0.8rem;
  padding: 0.6rem 2rem;

  background-color: ${ props => props.active ? 'var(--primary-700)' : 'var(--primary-500)' };
  border: 1px solid ${ props => props.active ? 'var(--primary-700)' : 'var(--primary-500)' };

  &:hover, &:active {
    background-color: var(--primary-700);
    border-color: var(--primary-700);
    text-decoration: none;
  }

  &:disabled {
    opacity: 0.5;
  }

  &:focus {
    outline: none;
  }

  &:not(:disabled) {
    cursor: pointer;
  }
`
export const SecondaryButton = styled(BasicButton)`
&& {
  background-color: white;
  color: var(--primary-500);
  
  &:active {
    background-color: var(--primary-700);
    border-color: var(--primary-700);
    color: white;
  }
}
`
export const IconButton = styled(BasicButton)`
&& {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  height: 2.2rem;
  width: 2.2rem;
  border-radius: 50%;

  svg {
    height: 1rem;
    width: auto;
  }
}
`
export const SmallButton = styled(BasicButton)`
&& {
  font-size: 0.6em;
  padding: 0.6rem 1rem;
}
`