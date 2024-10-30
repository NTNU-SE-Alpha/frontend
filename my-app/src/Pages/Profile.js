import React from 'react';
import styled from 'styled-components';
const ProfileContainer = styled.div`

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

    .Profileimage {
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

    .Profile-box {
      flex: 9;
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 100%;
      background: #FFFFFF;
      border-radius: 30px;
    }

  }

`;

const Profile = () => {
    return (
      <ProfileContainer>
          {/*
          <section className='left'>
            <button className='Profileimage'> 
              <img src="./images/ntnulogo.png"></img>
            </button>
          </section-->
          */}
          <section className='right'>
            <div className='Profile-box'>
              <h1>歡迎，User</h1>
            </div>
          </section>
      </ProfileContainer>
    )
  }
  
export default Profile