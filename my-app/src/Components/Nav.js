import { useEffect } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import {
  BotMessageSquare,
  GraduationCap,
  Settings,
  LogOut,
  Wrench,
} from 'lucide-react';
const Navbar = styled.nav`
  width: min-content;
  position: fixed;
  top: 5vh;
  left: 1em;
  z-index: 100;
  display: flex;
  height: 90vh;
  /* background: teal; */
  border-radius: 25px;

  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    border-radius: 50px;
    background: teal;
    a {
      padding: 0.5rem;
      padding-bottom: 0.7rem;
      text-align: center;
      display: flex;
      justify-content: center;
      text-decoration: none;
      /* &:first-child {
        border-radius: 50px 50px 0 0;
      } */
      transition: background-color 0.3s;
      color: #fff;

      a.icon {
        /* display: none; */
        text-decoration: none;
        font-weight: 600;
        letter-spacing: 0.1rem;
      }

      svg {
        color: #fff;
        width: 30px;
        height: 30px;
        &:hover {
          cursor: pointer;
        }
      }

      &.active_text {
        &:hover {
          background-color: #333;
          align-items: center;
          justify-content: space-evenly;
          flex-direction: column;
          cursor: pointer;
          &.no1:hover::after {
            content: '課程';
          }
          &.no2:hover::after {
            content: 'LLM';
          }
          &.no3:hover::after {
            content: '登出';
          }
          &.no4:hover::after {
            content: '分組';
          }
          &.nox:hover {
            background-color: teal;
            border-radius: 0 0 50px 50px;
            /* content: '設定'; */
          }
        }
      }
      &.nox {
        margin-top: auto;
        transition: none;
        /* justify-self: flex-end; */
      }
      /* position: relative; */
      /* .dropdown-menu {
        display: none;
        overflow: hidden;
        height: 0;
        top: 100%;
        left: 0;
        background-color: #333;
        li {
          a {
            display: none;
            color: #fff;
            text-decoration: none;
            font-weight: 600;
            letter-spacing: 0.1rem;
          }
        }
      } */
    }
  }
`;

const Flyout = styled.div`
  position: fixed;
  top: 0px;
  left: 0;
  width: 100vw;
  max-height: 0;
  transition: max-height 0.15s ease-out;
  overflow: hidden;
  background: linear-gradient(
    180deg,
    rgba(39, 27, 78, 1) 0%,
    rgba(40, 29, 79, 1) 35%,
    rgba(27, 19, 54, 1) 70%,
    rgba(11, 0, 23, 1) 100%
  );
  div {
    height: 100%;
    height: 100vh;
    height: 100dvh;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    padding: 1rem 0;
    // animation-name: banner_animation;
    // animation-duration: 5s;
    // animation-iteration-count: infinite;
    div {
      height: auto;
      a {
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 1) 0%,
          rgba(230, 230, 230, 1) 100%
        );
        text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        color: #fff;
        font-size: 1.5rem;
        padding: 1rem 0;
        letter-spacing: 0.25rem;
        text-decoration: none;
        font-weight: 600;
      }
      a.login_button {
        background: linear-gradient(
          90deg,
          rgba(255, 215, 0, 1) 0%,
          rgba(255, 165, 0, 1) 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
  @media screen and (max-width: 690px) {
    &.open {
      max-height: 100vh;
      transition: max-height 0.25s ease-in;
    }
  }
`;
const Star = styled.div``;
// const menuItems = [
//   // {
//   //   name: '首頁',
//   //   eng_name: 'home',
//   //   icon: (
//   //     <svg
//   //       xmlns="http://www.w3.org/2000/svg"
//   //       height="24px"
//   //       viewBox="0 -960 960 960"
//   //       width="24px"
//   //       fill="#e8eaed"
//   //     >
//   //       <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
//   //     </svg>
//   //   ),
//   // },
//   {
//     name: '課程',
//     eng_name: 'course',
//     icon: <GraduationCap />,
//   },
//   {
//     name: '聊天',
//     eng_name: 'chat',
//     icon: <BotMessageSquare />,
//   },
//   // {
//   //   name: '上傳',
//   //   eng_name: 'fileupload',
//   //   icon: (
//   //     <Upload />
//   //   ),
//   // },
//   {
//     name: '登出',
//     eng_name: 'login',
//     icon: <LogOut />,
//   },
//   {
//     name: '設定',
//     eng_name: 'setting',
//     icon: <Settings />,
//   },
// ];
const Nav = () => {
  useEffect(() => {
    function setVhVariable() {
      // 將視窗的高度乘以 0.01 並設置為 --vh 變數的值
      let vh_set = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh_set}px`);
    }

    // 頁面加載時初始化 --vh 變數
    setVhVariable();

    // 視窗大小改變時重新計算 --vh 變數的值
    window.addEventListener('resize', setVhVariable);

    // 組件卸載時移除事件監聽器
    return () => {
      window.removeEventListener('resize', setVhVariable);
    };
  }, []);

  const handlerClick = (e) => {
    e.target.classList.toggle('x');
    const flyout = document.querySelector('.flyout');
    flyout.classList.toggle('open');
  };

  return (
    <>
      <Navbar>
        <ul>
          <a href="/profile" className="first_li">
            <a class="first-icon">
              <img
                width="45px"
                src="/images/icons/first-logo.png"
                alt="profile"
              />
            </a>
          </a>
          <a href="/course" className="active_text no1">
            <a class="icon">
              <GraduationCap />
            </a>
          </a>
          <a href="/chat" className="active_text no2">
            <a class="icon">
              <BotMessageSquare />
            </a>
          </a>
          <a href="/student-list" className="active_text no4">
            <a class="icon">
              <Wrench />
            </a>
          </a>
          <a href="/logout" className="active_text no3">
            <a class="icon">
              <LogOut />
            </a>
          </a>
          <a href="/setting" className="active_text nox">
            <a class="icon">
              <Settings />
            </a>
          </a>
        </ul>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Nav;
