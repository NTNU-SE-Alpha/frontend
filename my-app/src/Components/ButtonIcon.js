import React from 'react'
import styled from 'styled-components'

const ButtonContainer = styled.button`
    border-radius: 0.7rem;
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

const ButtonIcon = (props) => {
    const className = props.style;
    const { onClick } = props;
    return (
      <ButtonContainer className={className} onClick={onClick}>{props.children}</ButtonContainer>
  )
}

export default ButtonIcon
