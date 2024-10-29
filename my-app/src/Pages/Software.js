import React from 'react';
import styled from 'styled-components';
const SoftwareContainer = styled.div`

  display: flex;
  height: 100vh;
  background: #FFFFFF;

  .left-box {
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


  .right-box {
    flex: 9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background: #5D5D5D;
    margin: 30px 30px 30px 130px;
    border-radius: 30px;

    .course-box {
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

      .material-symbols-outlined {
        color: black;
      }

      .dropdown {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
        margin: 20px 50px 0px 50px;
        background: #D9D9D9;
        border-radius: 10px;

        h2 {
          font-size: 18px;
        }
          
      }

      .grid-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 20px 50px;
        height: 100%;
        background: #FFFFFF;
        border-radius: 10px;
        border: 2px solid black; 
        padding: 15px;

        h3 {
          font-size: 18px;
          display: flex;
          justify-content: space-between;
          width: 100%; 
          padding-bottom: 10px;
        }
          
      }

      .left {
        text-align: left;
      }
      .center {
        text-align: center;
      }
      .right {
        text-align: right;
      }          

      .scrollable-container {
        
        width: 97%;               /* Set the container width */
        height: 400px;              /* Set the container height */
        border-radius: 5px;
        
        padding: 15px;              /* Optional: Padding inside container */
        overflow-y: auto;           /* Enables vertical scrolling */
        overflow-x: hidden;         /* Disables horizontal scrolling */
        background-color: #D9D9D9;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr); /* Creates 3 equal-width columns */
        gap: 15px;                              /* Space between grid items */
      }

      .grid-item {
        background-color: #FFFFFF;
        color: black;
        padding: 100px;
        text-align: center;
        border-radius: 20px;                   
      }

      .left-item {
        margin-right: 10px;
      }
      .right-item {
        margin-left: 500px; 
      }

  }

`;

const Software = () => {
    return (
      <SoftwareContainer>

          <section className='right-box'>
            <div className='course-box'>
              <h1>
                <a href="/course">
                  <span class="material-symbols-outlined">
                    arrow_back
                  </span>
                </a>
                &nbsp;&nbsp;軟體工程（星期二 34，四 4）
              </h1>

              <div class='dropdown'>
                <h2>公告 

                </h2>
              </div>

              <div class='grid-box'>
                <h3>
                  <div class="left">
                    <a href="/course">
                      <span class="material-symbols-outlined">
                        arrow_back
                      </span>
                    </a>
                    &nbsp;&nbsp;上一則
                  </div>
                  
                  <div class="center">第一週</div>

                  <div class="right">
                    下一則&nbsp;&nbsp;
                    <a href="/course">
                      <span class="material-symbols-outlined">
                      arrow_forward
                      </span>
                    </a>
                  </div>       
                </h3>

                <div class='scrollable-container'>
                  
                  <span class="material-symbols-outlined right-item">
                    edit_square
                  </span>
                  
                  <div class="grid">
                    <div class="grid-item">作業</div>
                    <div class="grid-item">課程資訊</div>
                    <div class="grid-item">考試</div>
                    <div class="grid-item"> </div>
                    <div class="grid-item"> </div>
                    <div class="grid-item"> </div>
                  </div>
                </div>
              </div>

            </div>
          </section>
      </SoftwareContainer>
    )
  }
  
  export default Software