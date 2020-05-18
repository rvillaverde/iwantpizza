import styled from "styled-components";

export const FormTitle = styled.div`
  margin: 1rem;
` 
export const FormSection = styled.section`
display: flex;

@media (max-width: 480px) {
  flex-direction: column;
}
`
export const FormSubsection = styled.div`
`
export const FormSubsectionLarge = styled.div`
  flex: 1;
`
export const FieldSet = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem;

  @media (max-width: 480px) {
    flex-wrap: wrap;
  }
`
export const FormInput = styled.input`
  width: 100%;
`
export const FormField = styled.div`
  flex-grow: 1;
  margin: 0 .5rem;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  @media (max-width: 480px) {
    margin: 1rem 0;
    margin-top: 0;
    width: 100%;

    &:last-child {
      margin-bottom: 0;
    }
  }
`
export const SmallFormField = styled(FormField)`
  && {
    max-width: 50%;
    flex-shrink: 1;

    &:last-child {
      padding-left: 1rem;
    }
  }
`
