import React from 'react'
import styled from 'styled-components'

const ButtonContainer = styled.button`
    border-radius: 0.7rem;
    padding: 0.5rem 1rem;
    background-color: #12A594;
    color: #fff;
    border: #12A594 solid 2px;
    &:hover {
        background-color: #207E73;
        color: #fff;
        border: #207E73 solid 2px;
    }
    &.白 {
        background-color: rgba(0,0,0,0);
        border: #207E73 solid 2px;
        color: #207E73;
        &:hover {
        background-color: rgba(0,0,0,0.05);
    }
    }
    &.chat {
        cursor: auto;
        user-select: text;
        text-align: left;
    }
    &.👀{
        width: clamp(60%, auto, 100%);
        align-self: flex-end;
    }
    &.🤖{
        width: clamp(60%, 20rem, 100%);
        align-self: flex-start;
    }
`;

const Button = (props) => {
    const className = props.style;
    return (
      <ButtonContainer className={className}>{props.children}</ButtonContainer>
  )
}

export default Button
