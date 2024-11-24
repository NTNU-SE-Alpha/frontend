import { useEffect } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import {
  BotMessageSquare,
  GraduationCap,
  Settings,
  Upload,
  LogIn,
} from 'lucide-react';
const Navbar = styled.nav`
  width: min-content;
  position: fixed;
  top: 5vh;
  left: 1em;
  z-index: 100;
  display: flex;
  height: 90vh;
  background: teal;
  border-radius: 50px;

  ul {
    display: flex;
    flex-direction: column;
    list-style: none;

    li {
      /* margin: 1rem 0; */
      padding: 1rem;
      text-align: center;
      display: flex;
      justify-content: center;
      /* &:first-child {
        border-radius: 50px 50px 0 0;
      } */
      transition: background-color 0.3s;

      svg {
        color: #fff;
        width: 45px;
        height: 45px;
        &:hover {
          cursor: pointer;
        }
      }

      a.icon {
        display: none;
        color: #fff;
        text-decoration: none;
        font-weight: 600;
        letter-spacing: 0.1rem;
      }
      &.active_text {
        &:hover {
          background-color: #333;
          align-items: center;
          justify-content: space-evenly;
          flex-direction: column;
        }
        &:hover a {
          display: block;
          position: relative;
        }
        &:hover svg {
          width: 24px;
          height: 24px;
        }
      }
      /* position: relative; */
      .dropdown-menu {
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
      }
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
const menuItems = [
  {
    name: '首頁',
    eng_name: 'home',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#e8eaed"
      >
        <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
      </svg>
    ),
  },
  {
    name: '課程',
    eng_name: 'course',
    icon: <GraduationCap />,
  },
  {
    name: '聊天',
    eng_name: 'chat',
    icon: <BotMessageSquare />,
  },
  // {
  //   name: '上傳',
  //   eng_name: 'fileupload',
  //   icon: (
  //     <Upload />
  //   ),
  // },
  {
    name: '登入',
    eng_name: 'login',
    icon: <LogIn />,
  },
  {
    name: '設定',
    eng_name: 'setting',
    icon: <Settings />,
  },
];
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
          <li className="first_li">
            <a href="/profile" class="first-icon">
              <img
                width="50px"
                src="/images/icons/first-logo.png"
                alt="profile"
              />
            </a>
          </li>
          {menuItems.map((item, index) => (
            <li className="active_text" key={index}>
              {item.icon}
              {/* <img width="20px" href="/images/c1.png" alt="setting" /> */}
              <a
                href={`/${item.eng_name}`}
                class={`${item.eng_name}_button icon`}
              >
                {item.name}
              </a>
              {item.dropdown && (
                <ul className="dropdown-menu">
                  {item.dropdown.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <a
                        href={`/#${subItem.eng_name}`}
                        className={`${subItem.eng_name}_button`}
                      >
                        {subItem.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Nav;
