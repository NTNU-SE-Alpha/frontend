import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Card from '../Components/Card';
import Button from '../Components/Button';
import { Pencil, ArrowLeft, ArrowRight } from 'lucide-react';
import { Reorder } from 'framer-motion';

const SoftwareContainer = styled.div`
  a#icon {
    color: black;
    line-height: 0;
    border-radius: 1rem;
    &:hover {
      background: #d9d9d9;
    }
  }
  display: flex;
  height: 100vh;
  background: #ffffff;

  .left-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    background: #5d5d5d;
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
    border: solid 2px teal;
    margin: 30px 30px 30px 130px;
    border-radius: 30px;

    .course-box {
      /* flex: 9;
      display: flex;
      flex-direction: column; */
      width: 100%;
      height: 100%;
      background: #ffffff;
      border-radius: 30px;
      overflow: hidden;

      div#h1 {
        margin: 1rem;
      }

      .material-symbols-outlined {
        color: black;
      }

      .dropdown {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 3rem;
        margin: 1rem 50px 0px 50px;
        border-radius: 10px;
        border: 2px solid teal;
        h2 {
          font-size: 18px;
        }
      }

      .grid-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px 50px;
        height: 100%;
        background: #ffffff;
        border-radius: 10px;
        border: 2px solid teal;
        padding: 15px;

        .頂 {
          font-size: 1rem;
          display: grid;
          grid-template-columns: auto auto auto;
          justify-content: space-between;
          width: 100%;
          padding-bottom: 10px;
        }
        .頂頂 {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      ul.tabs {
        display: flex;
        gap: 10px;
        list-style-type: none;
        padding: 0;
        margin: 0;
      }

      .center {
        text-align: center;
      }
      .right {
        text-align: right;
      }

      .scrollable-container {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
        border-radius: 5px;
        /* padding: 15px; */
        overflow-y: auto;
        overflow-x: hidden;
      }

      .grid {
        /* display: grid; */
        /* grid-template-columns: repeat(auto-fit, 263px); */
        gap: 1rem;
        display: flex;
        justify-content: center;
        width: 100%;
      }
      .grid-item {
        background-color: #ffffff;
        color: black;
        aspect-ratio: 1/1;
        text-align: center;
        border-radius: 20px;
      }

      .pad {
        width: 100%; /* Full width */
        height: 100%; /* Adjust the height as needed */
        margin: 1rem;
      }
    }
  }
`;
const initialTabs = ['作業', '課程資訊', '考試', '聊天'];
const Software = ({ params }) => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [tabs, setTabs] = useState(initialTabs);
  return (
    <SoftwareContainer>
      <section className="right-box">
        <div className="course-box">
          {/* <div id="h1">
                <a id='icon' href="/course">
                  <ArrowLeft />
                </a>
              </div> */}

          <div class="dropdown">
            <a id="icon" href="/course">
              <ArrowLeft />
            </a>
            <div>{courseId}公告</div>
          </div>

          <div class="grid-box">
            <div class="頂">
              <div class="頂頂">
                <a id="icon" href="/course">
                  <ArrowLeft />
                </a>
                <div>上一則</div>
              </div>

              <div class="center">第一週</div>

              <div class="頂頂">
                下一則
                <a id="icon" href="/course">
                  <ArrowRight />
                </a>
              </div>
            </div>
            <Reorder.Group
              as="ul"
              axis="x"
              onReorder={setTabs}
              className="tabs"
              values={tabs}
            >
              {tabs.map((item) => (
                <Reorder.Item key={item} value={item}>
                  <Button>{item}</Button>
                </Reorder.Item>
              ))}
            </Reorder.Group>

            <div class="scrollable-container">
              lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum
              dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit
              amet lorem ipsum dolor sit amet
            </div>
          </div>
        </div>
      </section>
    </SoftwareContainer>
  );
};

export default Software;
