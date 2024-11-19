import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonContainer = styled.button`
  border-radius: 0.7rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const ButtonIcon = ({ style, onClick, children }) => {
  return (
    <ButtonContainer className={style} onClick={onClick}>
      {children}
    </ButtonContainer>
  );
};
ButtonIcon.prototype = {
  style: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default ButtonIcon;
