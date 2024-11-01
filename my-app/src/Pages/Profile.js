import React from 'react';
import styled from 'styled-components';
import Button from '../Components/Button';
import ButtonIcon from '../Components/ButtonIcon';
import { Rocket } from 'lucide-react';

const ProfileContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #FFFFFF;
  gap: 2rem;
  .left {
    width: clamp(200px, 20%, 300px);
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    border: #5D5D5D solid 2px;
    margin: 2rem 0;
    margin-left: 2rem;
    border-radius: 50px;
    h2{
      width: 100%;
      font-size: 1.5rem;
      text-align: center;
    }
    p{
      border-bottom-width: 1px;
      border-bottom-color: #5D5D5D;
      margin-bottom: 2rem;
    }
    img {
      width: 70px;
      height: 70px;
      border: none;
      border-radius: 50%;
      background: white;
      cursor: pointer;
      margin-top: 2rem;
    }
    ul{
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      height: 100%;
    }
  }


  .right {
    flex: 5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    margin: 2rem 0;
    background: #5D5D5D;
    border-radius: 30px;

    h2{
      width: 100%;
      font-size: 1.5rem;
      text-align: center;
    }

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
          <section className='left'>
            <img src='images/profile.png' alt="profile" />
            <h2>User 1</h2>
            <p>Teacher</p>
            <></>
            <ul>
              <li><a href='/profile'>詳細資料</a></li>
              <li><a href='/profile'>課程</a></li>
              <li><a href='/profile'>登入活動</a></li>
              <li><a href='/profile'>LLM History</a></li>
              <li><a href='/profile'>統計資料</a></li>
              <li><a href='/profile'>設定</a></li>
            </ul>
          </section>
         
          <section className='right'>
            <div className='Profile-box'>
              <h2>歡迎，User</h2>
              <div>
                <img src="/images/profile.png" alt="profile" />
                <Button style="">送出</Button>
                <Button style="白">返回</Button>
                <ButtonIcon style="" onClick={()=>alert('jfn')}><Rocket /></ButtonIcon>
                <Rocket></Rocket>
              </div>
            </div>
          </section>
      </ProfileContainer>
    )
  }
  
export default Profile