import { useEffect } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
const Navbar = styled.nav`
  width: min-content;
  position: fixed;
  top: 5vh;
  left: 1em;
  z-index: 100;
  display: flex;
  height: 90vh;
  background: #5d5d5d;
  border-radius: 50px;
  ul{
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
      
      svg{
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
      &.active_text{
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
        &:hover svg{
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
`
// const Hamburger = styled.a`
//   display: none;
//   /* display: block; */
//   margin-left: 0.5rem;
//   width: 40px;
//   position: relative;
//   z-index: 1;
//   //appearance: none;
//   user-select: none;
//   outline: none;
//   background: none;
//   border: none;
//   cursor: pointer;

//   span {
//     display: block;
//     z-index: -1;
//     // 防止誤觸
//     pointer-events: none;

//     width: 40px;
//     height: 4px;
//     position: relative;
//     margin-bottom: 0.5rem;
//     border-radius: 5px;
//     background-color: #fff;
//     // transition
//     transform-origin: 0 0;
//     transition: all 0.7s;
//   }
//   &.x {
//     span:nth-child(1) {
//       transform: translate(0px, -2px) rotate(45deg);
//     }
//     span:nth-child(2) {
//       transform: translateX(20px);
//       opacity: 0;
//     }
//     span:nth-child(3) {
//       transform: translate(-3px, 3px) rotate(-45deg);
//     }
//   }
//   @media screen and (max-width: 690px) {
//     display: block;
//     position: absolute;
//     inset-inline-end: 16px;
//   }
// `;

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
        background: linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(230, 230, 230, 1) 100%);
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
        background: linear-gradient(90deg, rgba(255, 215, 0, 1) 0%, rgba(255, 165, 0, 1) 100%);
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
    name: "首頁",
    eng_name: "home",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
    ),
  },
  {
    name: "課程",
    eng_name: "course",
    icon:(
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
    ),
  },
  {
    name: "創建",
    eng_name: "create",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M560-320h80v-120h120v-80H640v-120h-80v120H440v80h120v120ZM240-140Q131-178 65.5-271.5T0-480q0-115 65.5-208.5T240-820v88q-74 35-117 103T80-480q0 81 43 149t117 103v88Zm360 20q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T240-480q0-75 28.5-140.5t77-114q48.5-48.5 114-77T600-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T960-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T600-120Zm0-360Zm0 280q117 0 198.5-81.5T880-480q0-117-81.5-198.5T600-760q-117 0-198.5 81.5T320-480q0 117 81.5 198.5T600-200Z"/></svg>
      ),
      dropdown: [
      {
        name: "創建活動",
        eng_name: "create_activity",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v200h-80v-40H200v400h280v80H200Zm0-560h560v-80H200v80Zm0 0v-80 80ZM560-80v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T903-300L683-80H560Zm300-263-37-37 37 37ZM620-140h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/></svg>
          ),
      },
      {
        name: "創建課程",
        eng_name: "create_course",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/></svg>
          ),
      },
      {
        name: "創建社團",
        eng_name: "create_club",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m668-380 152-130 120 10-176 153 52 227-102-62-46-198Zm-94-292-42-98 46-110 92 217-96-9ZM294-287l126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM173-120l65-281L20-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-340Z"/></svg>
          ),
        }
    ],
  },
  {
    name: "上傳",
    eng_name: "upload",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
      ),
  },
  {
    name: "登出",
    eng_name: "logout",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
    ),
  },
];
const Nav = () => {
  useEffect(() => {
    function setVhVariable() {
      // 將視窗的高度乘以 0.01 並設置為 --vh 變數的值
      let vh_set = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh_set}px`);
    }

    // 頁面加載時初始化 --vh 變數
    setVhVariable();

    // 視窗大小改變時重新計算 --vh 變數的值
    window.addEventListener("resize", setVhVariable);

    // 組件卸載時移除事件監聽器
    return () => {
      window.removeEventListener("resize", setVhVariable);
    };
  }, []);

  const handlerClick = (e) => {
    e.target.classList.toggle("x");
    const flyout = document.querySelector(".flyout");
    flyout.classList.toggle("open");
  };

  return (
    <>
      <Navbar>
        <ul>
          <li className="first_li">
            <a href="/profile" class="first-icon">
              <img width="50px" src="/images/icons/first-logo.png" alt="profile" />
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
        <Flyout className="flyout">
          <div>
            <div class="banner_button_register">
              <a href="https://camp-app.csie.cool/login" className="login_button">
                立即報名
              </a>
            </div>

            {menuItems.map((item, index) => (
              <div class="banner_button" key={index}>
                <a
                  href={`/#${item.eng_name}`}
                  class={`${item.eng_name}_button`}
                >
                  {item.name}
                </a>
              </div>
            ))}
          </div>
          <Star>
            <span id="stars"></span>
            <span id="stars2"></span>
            <span id="stars3"></span>
          </Star>
        </Flyout>
        {/* <Hamburger id="hamburger" onClick={handlerClick}>
          <span></span>
          <span></span>
          <span></span>
        </Hamburger> */}
      </Navbar>
      <Outlet />
    </>
  );
};

export default Nav;