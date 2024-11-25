import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
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
    border: dashed 2px teal;
    margin: 30px 30px 1.5rem 130px;
    border-radius: 30px;

    .top-area {
      display: flex;
      flex-direction: column;
      width: clamp(60%, 18rem, 100%);
      background: #ffffff;
      margin: 0 1rem;
    }

    .title-box {
      margin-bottom: 0.75rem;
      display: flex;
      justify-content: space-between;
      gap: clamp(1rem, 0, 1rem);
      width: clamp(60%, 18rem, 100%);
      div.flexContainer {
        a {
          height: 0;
          text-decoration: none;
          button#icon {
            display: flex;
            justify-content: center;
            &:hover {
              text-decoration: underline;
            }
            &.up::after {
              content: '返回';
              margin-left: 0.3rem;
            }
            &.down::after {
              content: '編輯';
              margin-left: 0.5rem;
            }
            &.mid::before {
              content: '';
            }
          }
        }
      }
    }
    ul.tabs {
      display: flex;
      gap: clamp(1rem, 1%, 1rem);
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
      flex-direction: column;
      width: clamp(60%, 18rem, 100%);
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
  const [tabs, setTabs] = useState([]);

  const getSectionData = async (courseId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/getSections/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const { sections } = response.data;
      console.log(sections);
      setCourseContent(sections);
      setTabs(sections.map((section) => section.name));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSectionData(courseId);
  }, []);

  const scrollToSection = (sectionName) => {
    const section = document.getElementById(sectionName);
    if (!section) return;
    section.scrollIntoView({ behavior: 'smooth' });
  };
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
              {/* <Link to={`#${encodeURIComponent(item)}`}> */}
              <Button onClick={() => scrollToSection(encodeURIComponent(item))}>
                {item}
              </Button>
              {/* </Link> */}
            </Reorder.Item>
          ))}
        </Reorder.Group>

        <div class="scrollable-container">
          {courseContent.map((sections) => {
            return (
              <div key={sections.id}>
                <div className="markdown-body">
                  <div
                    id={encodeURIComponent(sections.name)}
                    dangerouslySetInnerHTML={{
                      __html: marked(
                        `## [${sections.name}](/course/${courseId}/#${encodeURIComponent(sections.name)}) \n > ${sections.content} `
                      ),
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div class="title-box">
          <div class="flexContainer">
            <a href="/course">
              <Button id="icon" className="白 up" onClick={getSectionData}>
                <ArrowLeft />
              </Button>
            </a>
          </div>

          {/* <div class="flexContainer">
            <Button id="icon" className="白 mid" onClick={getSectionData}>
              <Pencil />
            </Button>
          </div> */}

          <div class="flexContainer">
            <a href="/edit">
              <Button id="icon" className="白 down" onClick={getSectionData}>
                <Pencil />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </SoftwareContainer>
  );
};

export default CourseInfo;
