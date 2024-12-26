import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { ChevronsRight, ChevronsLeft } from 'lucide-react';
import ButtonIcon from './ButtonIcon';
import {
  BotMessageSquare,
  GraduationCap,
  Settings,
  LogOut,
  Wrench,
  SquareActivity,
} from 'lucide-react';
const Hamberger = styled.div`
  display: none;
  @media screen and (max-width: 690px) {
    display: block;
    position: fixed;
    top: 0.2rem;
    left: 1rem;
    z-index: 1001;

    button {
      &.open {
        display: block;
      }
      &.close {
        display: none;
      }
    }
  }
`;
const Navbar = styled.nav`
  width: min-content;
  position: fixed;
  top: 5vh;
  z-index: 100;
  display: flex;
  height: 90vh;
  border-radius: 25px;
  left: -100%;
  transition: left 0.3s ease;
  &.open {
    left: 1em;
  }
  @keyframes slideInFromLeft {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }
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
            content: '分組';
          }
          &.no4:hover::after {
            content: '回饋';
          }
          &.no5:hover::after {
            content: '登出';
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
      }
    }
  }
`;
const OutletContainer = styled.div`
  main {
    margin-left: 120px;
  }
  @media screen and (max-width: 690px) {
    main {
      margin: 0 1rem;
    }
  }
`;

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };
  useEffect(() => {
    // 定義視窗尺寸變化處理函數
    const handleResize = () => {
      if (window.matchMedia('(min-width: 690px)').matches) {
        setIsOpen(true); // 視窗大於 690px 時自動打開 nav
      } else {
        setIsOpen(false); // 視窗小於或等於 690px 時關閉 nav
      }
    };

    // 初始化
    handleResize();

    // 添加監聽器
    window.addEventListener('resize', handleResize);

    // 移除監聽器
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Hamberger>
        {!isOpen && (
          <ButtonIcon onClick={handleToggle}>
            <ChevronsRight />
          </ButtonIcon>
        )}
        {isOpen && (
          <ButtonIcon onClick={handleToggle}>
            <ChevronsLeft />
          </ButtonIcon>
        )}
      </Hamberger>
      <Navbar className={`flyout ${isOpen ? 'open' : ''}`}>
        <ul>
          <a href="/profile" className="first_li">
            <a className="first-icon">
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
          <a href="/student-list" className="active_text no3">
            <a class="icon">
              <Wrench />
            </a>
          </a>
          <a href="/feeback" className="active_text no4">
            <a class="icon">
              <SquareActivity />
            </a>
          </a>
          <a href="/logout" className="active_text no5">
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

      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </>
  );
};

export default Nav;
