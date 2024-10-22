import React from 'react';
import styled from 'styled-components';
const SoftwareContainer = styled.div`

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

    button img {
        width: 70px;
        height: 70px;
    }
  }


  .right {
    flex: 9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background: #5D5D5D;
    margin: 30px 30px 30px 130px;
    border-radius: 30px;

    .Software-box {
      flex: 9;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      background: #FFFFFF;
      border-radius: 30px;

      h1 {
        margin: 20px;
      }

      .dropdown {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        margin: 50px 50px 0px 50px;
        background: #D9D9D9;
        border-radius: 10px;

        h2 {
          font-size: 18px;
        }
          
      }

      .grid {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 50px;
        height: 100%;
        background: #FFFFFF;
        border-radius: 10px;
        border: 2px solid black; 
      }
    }

  }

`;

const Software = () => {
    return (
      <SoftwareContainer>
          {/*
          <section className='left'>
            <button className='Softwareimage'> 
              <img src="./images/ntnulogo.png"></img>
            </button>
          </section-->
          */}
          <section className='right'>
            <div className='Software-box'>

              <h1>
                <span class="material-symbols-outlined">
                  arrow_back
                </span>
                &nbsp;&nbsp;軟體工程（星期二 34，四 4）
              </h1>

              <div class='dropdown'>
                <h2>公告 

                </h2>
              </div>

              <div class='grid'>

              </div>
            </div>
          </section>
      </SoftwareContainer>
    )
  }
  
  export default Software