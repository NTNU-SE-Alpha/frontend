import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const LoginContainer = styled.div`

  display: flex;
  height: 100vh;
  background: linear-gradient(180deg, #B2FEE6 0%, #00E8DC 100%);

  .left {
    flex: 1;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background: linear-gradient(180deg, #F2FFFB 56%, #ACFFE5 100%);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    h1 {
      margin-bottom: 20px;
      font-size: 2rem;
      color: #333;
      letter-spacing: 5px;
    }

    form {
      width: 100%;
      max-width: 400px;
      display: flex;
      flex-direction: column;
      align-items: center;

      input {
        width: 100%;
        padding: 15px;
        margin: 10px 0;
        border-radius: 30px;
        border: 1px solid #ccc;
        font-size: 1rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

        &:focus {
          outline: none;
          border-color: #00e8dc;
          box-shadow: 0 0 10px #00e8dc;
        }
      }

      .submit-btn {
        width: 100%;
        padding: 15px;
        margin: 10px 0;
        background: linear-gradient(90deg, #B2FEE6 0%, #00E8DC 100%);
        border: none;
        border-radius: 30px;
        color: white;
        font-size: 2rem;
        font-weight: 900;
        cursor: pointer;
        transition: background 0.3s ease;

        &:hover {
          background: linear-gradient(90deg, #00E8DC 0%, #B2FEE6 100%);
        }
      }
    }

    .links {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      width: 100%;
      max-width: 400px;

      a {
        padding: 0 10px;
        text-decoration: none;
        color: #595959;
        font-size: 0.9rem;
        letter-spacing: 2px;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                username: email,
                password: password
            });
            if (response.data.access_token) {
                // 將 JWT 存儲在 localStorage 或 sessionStorage 中
                localStorage.setItem('token', response.data.access_token);
                console.log(response.data)
                setMessage('登入成功！');
                navigate('/profile'); 
            }
        } catch (error) {
            const errorMessage = error.response && error.response.data && error.response.data.message 
              ? error.response.data.message 
              : error.message;

            console.log('登入失敗：', errorMessage);
            setMessage(errorMessage);
          }
    };
    return (
      <LoginContainer>
        <section className='left'>
            <img src='images/loginbg.png' alt='pic' />
        </section>
        <section className='right'>
            <h1>登入</h1>
            <form onSubmit={handleLogin}>
                <input
                    type='text'
                    placeholder='電子信箱'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='密碼'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit' className='submit-btn'>→</button>
            </form>
            <div className='links'>
                <a href='/forgetpassword'>忘記密碼?</a>
                <a href='/register'>註冊→</a>
            </div>
            <p>{message}</p>
        </section>
      </LoginContainer>
    );
}

export default Login;