import { useState } from 'react';
import styled from 'styled-components';
import ButtonIcon from './ButtonIcon';
import { Ellipsis } from 'lucide-react';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
  padding: 0.5rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  .message {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-radius: 8px;
    padding: 0.8rem;
    transition: background-color 0.2s ease;
    /* 
    &:hover {
      background-color: #f8f8f8;
    } */

    .children {
      flex-grow: 1;
      margin-right: 1rem;
    }

    .actions {
      position: relative;
    }

    .dropdown {
      display: ${(props) => (props.isOpen ? 'flex' : 'none')}; // 根據狀態顯示
      position: absolute;
      right: 0;
      top: 100%;
      background-color: white;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

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
  }
`;
const DropdownMenu = styled.div`
  /* position: absolute;
  top: 100%;
  left: 0; */

  /* margin-top: 5px; */
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 1000;
  width: 100%; /* Match button width */
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  flex-direction: column;
  border: 1px solid #ccc;

  div {
    color: #000000;
    padding: 10px;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

const Dialog = ({ children, onDelete, uuid, onSummary, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleDropdown = (e) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete && uuid) {
      onDelete(uuid); // 傳遞 uuid 到刪除函數
    }
    setIsOpen(false); // 關閉下拉選單
  };
  return (
    <Container isOpen={isOpen} {...rest}>
      <div className="message">
        <div className="children">{children}</div>
        <div className="actions">
          <ButtonIcon onClick={(e) => handleDropdown(e)}>
            <Ellipsis />
          </ButtonIcon>
          <DropdownMenu className="dropdown">
            <button onClick={handleDelete}>刪除</button>
            <button onClick={(e) => onSummary(e)}>發布此對話</button>
          </DropdownMenu>
        </div>
      </div>
    </Container>
  );
};

export default Dialog;
