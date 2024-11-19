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

const ButtonIcon = ({ children, ...rest }) => {
  return <ButtonContainer {...rest}>{children}</ButtonContainer>;
};
ButtonIcon.prototype = {
  children: PropTypes.node.isRequired,
};

export default ButtonIcon;
