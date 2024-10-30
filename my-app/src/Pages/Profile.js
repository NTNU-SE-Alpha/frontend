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
  }


  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background: #5D5D5D;
    margin: 30px 30px 30px 130px;
    border-radius: 30px;

    .Profile-box {
      /* flex: 1; */
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100%;
      background: #FFFFFF;
      border-radius: 30px;
      h1{
        font-size: 2rem;
        margin-top: 1.5rem;
      }
      div{
        align-self: flex-start;
        display: block;
        margin: 1rem;
        img{
          width: 50px;
          height: 50px;
        }
      }
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
              <div>
                <img src="/images/profile.png" alt="profile" />
                <Button>Click me</Button>
              </div>
            </div>
          </section>
      </ProfileContainer>
    )
  }
  
export default Profile