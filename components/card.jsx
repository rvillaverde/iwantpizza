import styled from 'styled-components'

export const CardWrapper = styled.div`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (min-width: 480px) and (max-width: 840px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 840px) and (max-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }
`
export const CardLarge = styled.div`
  background-color: white;
  overflow: hidden;
  transition: box-shadow .3s ease-in-out;
  border-radius: 1rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);
  cursor: auto;
  
  &:not(:first-child) {
    margin-top: 1rem;
  }
`
export const Card = styled(CardLarge)`
&& {
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12);
  margin: 0;
  
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12);
    text-decoration: none;
  }
}
` 
export const CardMedia = styled.div`
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  &::before {
    content: "";
    display: block;
    width: 100%;
    padding-top: 66.666%;
  }
` 
export const CardPrimary = styled.div`
  margin: 1rem;
`
export const CardActions = styled.div`
  margin: 1rem;
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 1rem;
`
export const CardTitle = styled.h3`
  font-weight: 700;
  margin: 0;
`
const CardText = styled.p`
  font-size: 0.8rem;
`
