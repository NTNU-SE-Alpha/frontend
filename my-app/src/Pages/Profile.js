import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Button from '../Components/Button';
import ButtonIcon from '../Components/ButtonIcon';
import { Rocket } from 'lucide-react';

const ProfileContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #ffffff;
  gap: 1rem;
  .left {
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    border: #5d5d5d solid 2px;
    margin: 2rem 0;
    margin-left: 8rem;
    border-radius: 50px;
    h2 {
      width: 100%;
      font-size: 1.5rem;
      text-align: center;
    }
    p {
      border-bottom-width: 1px;
      border-bottom-color: #5d5d5d;
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
    ul {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      height: 100%;
      margin-bottom: 1rem;
      li {
        width: 100%;
        a {
          width: 100%;
          button {
            width: 100%;
          }
        }
        &.end {
          margin-top: auto;
        }
      }
    }
  }

  .right {
    flex: 5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    margin: 2rem 1rem;
    background: teal;
    border-radius: 30px;

    h2 {
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
      background: #ffffff;
      border-radius: 30px;
      h1 {
        font-size: 2rem;
        margin-top: 1.5rem;
      }

      .profile-info {
        align-self: flex-start;
        height: 100vh;
        display: block;
        margin: 1rem;
        img {
          width: 50px;
          height: 50px;
        }
      }
    }
  }
`;

const Profile = () => {
  const [user, setUser] = useState({});
  const token = localStorage.getItem('token');

  const getUserData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { user } = response.data;
      console.log(user);
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <ProfileContainer>
      <section className="left">
        <img src="images/profile.png" alt="profile" />
        <h2>{user.username}</h2>
        <p>{user.user_type}</p>
        <ul>
          <li>
            <a href="/profile">
              <Button className="白">詳細資料</Button>
            </a>
          </li>
          <li>
            <a href="/profile">
              <Button className="白">課程</Button>
            </a>
          </li>
          <li>
            <a href="/profile">
              <Button className="白">登入活動</Button>
            </a>
          </li>
          <li>
            <a href="/profile">
              <Button className="白">LLM History</Button>
            </a>
          </li>
          <li>
            <a href="/profile">
              <Button className="白">統計資料</Button>
            </a>
          </li>
          <li className="end">
            <a href="/course">
              <Button className="白">返回</Button>
            </a>
          </li>
        </ul>
      </section>

      <section className="right">
        <div class="Profile-box">
          <h2>歡迎 {user.username}</h2>
          <div class="profile-info">
            {/* <img src="/images/profile.png" alt="profile" /> */}
            <p>累計使用llm次數：</p>
            <p>剩餘使用llm次數：</p>
            <p>上次造訪：</p>

          </div>
        </div>
      </section>
    </ProfileContainer>
  );
};

export default Profile;
