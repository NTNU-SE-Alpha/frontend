// Modal.js
import React from 'react';
import { X } from 'lucide-react';
import styled from 'styled-components';
import ButtonIcon from './ButtonIcon';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
  div.modal {
    background-color: #fff;
    border-radius: 8px;
    padding: 24px;
    position: relative;
    max-width: 400px;
    width: 100%;

    max-height: 80vh;

    button.X {
      position: absolute;
      top: 8px;
      right: 8px;
      ::hover {
        color: #6b7280;
      }
      /* background: none; */
      /* border: none; */
      /* color: #6b7280; */
      cursor: pointer;
    }
  }
`;
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <Container onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <ButtonIcon className="X" onClick={onClose}>
          <X />
        </ButtonIcon>
        {children}
      </div>
    </Container>
  );
}

export default Modal;
