import React from 'react';
import styled from 'styled-components';
const ForgetPasswordContainer = styled.div`
  display: flex;
  height: 100vh;
  background: linear-gradient(180deg, #b2fee6 0%, #00e8dc 100%);

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
    background: linear-gradient(180deg, #f2fffb 56%, #acffe5 100%);
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
        background: linear-gradient(90deg, #b2fee6 0%, #00e8dc 100%);
        border: none;
        border-radius: 30px;
        color: white;
        font-size: 1.2rem;
        font-weight: 900;
        cursor: pointer;
        transition: background 0.3s ease;

        &:hover {
          background: linear-gradient(90deg, #00e8dc 0%, #b2fee6 100%);
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

const ForgetPassword = () => {
  return (
    <ForgetPasswordContainer>
      <section className="left">
        <img src="images/loginbg.png" alt="pic" />
      </section>
      <section className="right">
        <h1>註冊</h1>
        <form>
          <input type="text" placeholder="您的電子信箱" />
          <br />
          <input type="password" placeholder="請輸入密碼" />
          <br />
          <input type="password" placeholder="再次確認密碼" />
          <br />
          <button className="submit-btn">寄送驗證信 →</button>
        </form>
        <div className="links">
          <a href="/forgetpassword">忘記密碼?</a>
          <a href="/login">返回登入</a>
        </div>
      </section>
    </ForgetPasswordContainer>
  );
};

export default ForgetPassword;
