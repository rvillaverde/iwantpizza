import styled from 'styled-components'

export const Table = styled.table`
  border-collapse: collapse;
  padding: 1rem;
  width: 100%;
`
export const Tr = styled.tr`
  border-bottom: 1px solid var(--border-color);
  @media (max-width: 840px) {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
`
export const Td = styled.td`
  padding: 1rem .5rem;

  @media (max-with: 840px) {
    padding: .4rem;
  }
  p {
    margin: 0;
  }
  &:first-child {
    padding-left: 1rem;
  }
  &:first-child {
    padding-right: 0;
  }
  &:last-child {
    padding-right: 1rem;
  }
  &:nth-child(4) {
    margin-left: auto;
  }
`
export const THead = styled.thead`
`
export const TBody = styled.tbody`
  td {
    padding: 1rem;
    
    @media (max-width: 840px) {
      padding: 1rem .5rem;
      width: unset;
    }
  }
`
export const TFoot = styled.tfoot`
  td {
    padding: 1rem;

    &:first-child {
      padding-right: .5rem;
    }

    &:last-child {
      padding-left: .5rem;

      @media (max-width: 840px) {
        margin-left: auto;
      }
    }
  }
`
export const ImageColumn = styled(Td)`
&& {
  padding: 1rem;

  @media (max-width: 840px) {
    padding: 1rem .5rem;
  }
}
`
export const NumberColumn = styled(Td)`
&& {
  text-align: right;
}
`
export const ActionsColumn = styled(Td)`
&& {
  * {
    margin-left: auto;
  }
  @media (max-width: 840px) {
    margin-left: auto;
  }
}
`
export const DescriptionColumn = styled(Td)`
&& {
  @media (max-width: 840px) {
    flex-grow: 1;
    max-width: calc(100% - 10rem);
    padding-left: 0;
    width: 100%;
  }
}
`
