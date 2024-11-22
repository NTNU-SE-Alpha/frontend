import React from 'react'
import styled from 'styled-components'
import Button from '../Components/Button';
import ButtonIcon from '../Components/ButtonIcon';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    color: red;
    gap: 1rem;
    div{
        display: flex;
        justify-content: center;
        width: 100px;
        border: 1px solid black;
        border-radius: 1rem;
        padding: 1rem;
    }
    div:hover{
        cursor: insert;
    }
    div.no1{
    color: blue;
    }
`

const Something = () => {
  return (
    <Container>
        <div className='no1'>標題</div>
        <div>標題</div>
        <div>標題</div>
        <Button className="白">內容</Button>
        <ButtonIcon onClick={() => {alert("你按了")}}><Button/></ButtonIcon>
        
    </Container>
  )
}

export default Something