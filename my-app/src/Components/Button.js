import React from 'react';
import styled, { css } from 'styled-components';

const root = css`
  background: linear-gradient(
    90deg,
    #0b959c 0%,
    #1fc0b1 50%,
    #6dd5a4 75%,
    #99ff86 100%
  );
`;

const ButtonContainer = styled.button`
  border-radius: 0.7rem;
  padding: 0.5rem 1rem;
  background-color: teal;
  color: #fff;
  border: teal solid 2px;
  &:hover {
    background-color: #044842;
    color: #fff;
    border: #044842 solid 2px;
  }
  &.白 {
    background-color: rgba(0, 0, 0, 0);
    border: #207e73 solid 2px;
    color: #207e73;
    &:hover {
      border: #207e73 solid 2px;
    }
  }
  &.chat {
    cursor: auto;
    user-select: text;
    text-align: left;
  }
  &.👀 {
    width: clamp(60%, auto, 100%);
    align-self: flex-end;
  }
  &.🤖 {
    width: clamp(60%, 20rem, 100%);
    align-self: flex-start;
  }
  &.🎨 {
    ${root};
    border: none;
  }
`;

const Button = ({ children, ...rest }) => {
  return <ButtonContainer {...rest}>{children}</ButtonContainer>;
};

export default Button;
