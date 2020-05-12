import React from 'react';
import styled from "styled-components";
import { LoadingAnimation } from './animations'

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ModalView show={ this.props.open }>
        <ModalBackdrop show={ this.props.open } onClick={ this.props.handler }/>
        <ModalContent>
          { this.props.children }
          { this.props.loading && 
            <LoadingScrim>
              <LoadingAnimation></LoadingAnimation>
            </LoadingScrim>
          }
        </ModalContent>
      </ModalView>
    )
  }
}

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
  max-height: calc(100vh - 2rem);
  max-width: calc(100vw - 2rem);
  overflow: auto;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);

  @media (max-width: 460px) {
    padding: 1rem 0;
  }
`;

const LoadingScrim=styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(255,255,255,.8);
  display: flex;
  justify-content: center;
  align-items: center;
`
export default Modal;
