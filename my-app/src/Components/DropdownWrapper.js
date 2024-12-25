// DropdownWrapper Component
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { ChevronDown } from 'lucide-react';

const DropdownWrapperStyled = styled.div`
  position: relative;
  button.change {
    display: inline-flex;
    align-items: center;
    svg {
      margin-left: 0.25rem;
    }
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 5px;
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

const DropdownWrapper = ({ options, selectedOption, onOptionSelect }) => {
  const dropdownRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleOptionClick = (option) => {
    onOptionSelect(option);
    setDropdownVisible(false);
  };

  return (
    <DropdownWrapperStyled ref={dropdownRef}>
      <Button
        onClick={() => setDropdownVisible(!dropdownVisible)}
        className="change"
      >
        {selectedOption}
        <ChevronDown />
      </Button>
      <DropdownMenu visible={dropdownVisible}>
        {options.map((option) => (
          <div key={option} onClick={() => handleOptionClick(option)}>
            {option}
          </div>
        ))}
      </DropdownMenu>
    </DropdownWrapperStyled>
  );
};

export default DropdownWrapper;
