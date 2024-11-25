import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
// import Card from '../Components/Card';
import Button from '../Components/Button';
import ButtonIcon from '../Components/ButtonIcon';
import { Pencil, ArrowLeft, ArrowRight } from 'lucide-react';
import { Reorder } from 'framer-motion';
import axios from 'axios';
import { marked } from 'marked';
const SoftwareContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #ffffff;
  .right-box {
    flex: 9;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    border: solid 2px teal;
    margin: 30px 30px 30px 130px;
    border-radius: 30px;

    .top-area {
      display: flex;
      flex-direction: column;
      width: clamp(60%, 18rem, 100%);
      background: #ffffff;
      margin: 0 1rem;
    }

    .title-box {
      margin-top: 1rem;
      display: flex;
      justify-content: space-between;
      gap: clamp(1rem, 5%, 1rem);
      width: clamp(60%, 18rem, 100%);
      div.flexContainer{
        Button#icon {
          display: flex;
          justify-content: center;  
          &:hover {
            text-decoration: underline;
          }
          &.up::after {
            content: '上一則';
          }
          &.down::before {
            content: '下一則';
          }
          &.mid::before {
            content: '';
          }
        }
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
  }
`;
const initialTabs = ['作業', '課程資訊', '考試', '聊天'];
const markdownContent = marked(`## 課程公告`);
const CourseInfo = ({ params }) => {
  const { courseId } = useParams();
  const [courseContent, setCourseContent] = useState([]);
  const [currentContent, setCurrentContent] = useState({});
  const getSectionData = async (courseId) => {
    try {
      const response = await axios.get(`/getSections/${courseId}`);
      const { sections } = response.data;
      setCourseContent(sections);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSectionData();
  }, []);
  const [tabs, setTabs] = useState(initialTabs);
  return (
    <SoftwareContainer>
      <section className="right-box">
        <div className="top-area">
          <div className="markdown-body">
            <div dangerouslySetInnerHTML={{ __html: markdownContent }} />
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
        <div class="title-box">
          <div class="flexContainer">
            <Button id="icon" className='白 up' onClick={getSectionData}>
              <ArrowLeft />
            </Button>
          </div>

          <div class="flexContainer">
            <Button id="icon" className='白 mid' onClick={getSectionData}>
              <Pencil />
            </Button>
          </div>

          <div class="flexContainer">
            <Button id="icon" className='白 down' onClick={getSectionData}>
              <ArrowRight />
            </Button>
          </div>
        </div>

        <div class="scrollable-container">
          {courseContent.map((section) => () => {
            return (
              <div
                key={section.id}
                title={section.title}
                content={section.content}
              />
            );
          })}
        </div>
      </section>
    </SoftwareContainer>
  );
};

export default CourseInfo;
