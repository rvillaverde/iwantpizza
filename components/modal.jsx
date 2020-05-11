import styled from "styled-components";

const ModalBackdrop = styled.div`
  position: fixed;
  background-color: rgba(0,0,0,.64);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
`;

const ModalView = styled.div`
  align-itms: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 30;
  display: ${ props => props.show ? 'flex' : 'none' };
`;

const ModalContent=styled.div`
  margin: auto;
  position: relative;
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;
  max-width: calc(100vw - 2rem);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);
`;

export default function Modal({ children, open, handler }) {
  return (
    <ModalView show={ open }>
      <ModalBackdrop show={ open } onClick={ handler }/>
      <ModalContent>
        { children }
      </ModalContent>
    </ModalView>
  )
}
