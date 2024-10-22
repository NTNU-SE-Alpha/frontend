import React from 'react';
import styled from 'styled-components';
const ChatContainer = styled.div`

  display: flex;
  height: 100vh;
  background: #FFFFFF;

  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    background: #5D5D5D;
    margin: 30px 0px 30px 20px;
    border-radius: 50px;

    .Chatimage {
      width: 70px;
      height: 70px;
      border: none;
      border-radius: 50%;
      background: white;
      cursor: pointer;
      margin-top: 30px;
    }

    button img {
        width: 70px;
        height: 70px;
    }
  }


  .right {
    flex: 9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background: #5D5D5D;
    margin: 30px 30px 30px 130px;
    border-radius: 30px;

    .chat-box {
      flex: 9;
      display: flex;
      flex-direction: row;
      width: 80%;
      height: 100%;
      background: #D9D9D9;
      border-radius: 30px;
    }

    .chat-input {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 80%;
      height: 100%;
      background: #FFFFFF;
      border-radius: 30px;
      margin: 20px 0px 0px 0px;

      input {
        flex: 1;
        font-size: 16px;
        width: 100%;
        padding: 15px;
        border-radius: 30px;
        border: none;
      }
    }

    
  }


  

`;

const Chat = () => {
    return (
      <ChatContainer>
          {/*
          <section className='left'>
            <button className='Chatimage'> 
              <img src="./images/ntnulogo.png"></img>
            </button>
          </section-->
          */}
          <section className='right'>
            <div className='chat-box'></div>
            <div class='chat-input'>
              <input type="text" placeholder="Type a message..."></input>
            </div>
          </section>
      </ChatContainer>
    )
  }
  
  export default Chat