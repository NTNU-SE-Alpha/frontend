import { useEffect } from "react";
import styled from "styled-components";
const Hamburger = styled.a`
  display: none;
  /* display: block; */
  margin-left: 0.5rem;
  width: 40px;
  position: relative;
  z-index: 1;
  //appearance: none;
  user-select: none;
  outline: none;
  background: none;
  border: none;
  cursor: pointer;

  span {
    display: block;
    z-index: -1;
    // 防止誤觸
    pointer-events: none;

    width: 40px;
    height: 4px;
    position: relative;
    margin-bottom: 0.5rem;
    border-radius: 5px;
    background-color: #fff;
    // transition
    transform-origin: 0 0;
    transition: all 0.7s;
  }
  &.x {
    span:nth-child(1) {
      transform: translate(0px, -2px) rotate(45deg);
    }
    span:nth-child(2) {
      transform: translateX(20px);
      opacity: 0;
    }
    span:nth-child(3) {
      transform: translate(-3px, 3px) rotate(-45deg);
    }
  }
  @media screen and (max-width: 690px) {
    display: block;
    position: absolute;
    inset-inline-end: 16px;
  }
`;
const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: #433083;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  // animation-name: banner_animation;
  // animation-duration: 5s;
  // animation-iteration-count: infinite;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
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
    name: "營隊介紹",
    eng_name: "about",
  },
  {
    name: "報名資訊",
    eng_name: "info",
  },
  {
    name: "常見問題",
    eng_name: "faq",
  },
  {
    name: "交通資訊",
    eng_name: "traffic",
  },
  {
    name: "歷屆回顧",
    eng_name: "review",
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
  function smoothScroll(event, targetId) {
    event.preventDefault();
    const hamburger = document.getElementById("hamburger");
    hamburger.classList.remove("x");
    const flyout = document.querySelector(".flyout");
    flyout.classList.remove("open");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      window.setTimeout(function () {
        window.scrollTo({
          top: window.scrollY - 75,
          behavior: "smooth",
        });
      }, 700);
    }
  }
  function smoothScrollToTop(event) {
    event.preventDefault();

    const targetElement = document.getElementById("top");
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }
  return (
    <>
      <Header>
        <Container>
          {/* left */}
          <a href="/#top" class="home_link" onClick={smoothScrollToTop}>
            <img src="images/loginbg.png" width="5px" alt="logo" class="banner_logo"></img>
          </a>
          {/* right */}
          <nav class="banner banner_background">
            <ul class="nav_ul">
              {menuItems.map((item, index) => (
                <li class="banner_button" key={index}>
                  <a
                    href={`/#${item.eng_name}`}
                    class={`${item.eng_name}_button`}
                    onClick={(e) => smoothScroll(e, item.eng_name)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              <li class="banner_button_register">
                <a href="https://camp-app.csie.cool/login" className="login_button">
                  立即報名
                </a>
              </li>
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
                      onClick={(e) => smoothScroll(e, item.eng_name)}
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
            <Hamburger id="hamburger" onClick={handlerClick}>
              <span></span>
              <span></span>
              <span></span>
            </Hamburger>
          </nav>
        </Container>
      </Header>
    </>
  );
};

export default Nav;