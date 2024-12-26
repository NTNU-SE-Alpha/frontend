import React from 'react';
import styled from 'styled-components';
import ButtonIcon from './ButtonIcon';
import { Ellipsis } from 'lucide-react';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  .message {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background-color: white;
    border-radius: 8px;
    padding: 0.8rem;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #f8f8f8;
    }

    .children {
      flex-grow: 1;
      margin-right: 1rem;
    }

    .actions {
      position: relative;
    }

    .dropdown {
      position: absolute;
      right: 0;
      top: 100%;
      background-color: white;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      display: none;
      flex-direction: column;
      z-index: 10;

      button {
        padding: 0.5rem 1rem;
        border: none;
        background: none;
        text-align: left;
        cursor: pointer;

        &:hover {
          background-color: #f0f0f0;
        }
      }
    }

    &:hover .dropdown {
      display: flex;
    }
  }
`;

const Dialog = ({ children, onDelete, onSummary, ...rest }) => {
  return (
    <Container {...rest}>
      <div className="message">
        <div className="children">{children}</div>
        <div className="actions">
          <ButtonIcon>
            <Ellipsis />
          </ButtonIcon>
          <div className="dropdown">
            <button onClick={onDelete}>Delete</button>
            <button onClick={onSummary}>Summary</button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dialog;
