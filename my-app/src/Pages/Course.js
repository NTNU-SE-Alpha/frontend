import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CourseCard from '../Components/CourseCard';
import { motion } from 'framer-motion';
import { Pen, Search } from 'lucide-react';
import dataClasses from '../Data/classData';
import axios from 'axios';
import ButtonIcon from '../Components/ButtonIcon';
import Button from '../Components/Button';
import { Reorder } from 'framer-motion';
import { marked } from 'marked';
import { Star } from 'lucide-react';

// import { createClient } from 'pexels';
// const client = createClient(process.env.REACT_APP_PEXELS_API);
const Fliter = styled.div`
  z-index: 101;
  background-color: #fff;
  opacity: 0;
  border-radius: 20px;
  width: fit-content;
  padding: 1rem 1.75rem;
  position: absolute;
  top: 80px;
  right: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  height: 0;
  visibility: hidden;
  overflow: hidden;
  transition:
    height 0.3s,
    opacity 0.3s,
    visibility 0.3s;
  &.open {
    height: fit-content;
    opacity: 1;
    visibility: visible;
  }
  a {
    /* border-radius: 1rem; */
    background-color: none;
    border: none;
    width: 100%;
    font-size: 1rem;
    padding: 10px 0px 0 0px;
    border-bottom: 1px solid #ccc;
  }
`;
const Section = styled.section`
  display: flex;
  flex-direction: column;
  margin-left: 120px;
  ul.tabs {
    display: flex;
    justify-content: center;
    gap: 10px;
    list-style-type: none;
    padding: 0;
    margin: 0 0 1rem 0;
    /* overflow-x: auto; */
    li {
      button {
        div.iconFlex {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 5px;
        }
      }
    }
  }
`;
const FlexCard = styled.div`
  display: grid;
  /* width: 70vw; */
  grid-template-columns: repeat(auto-fit, 263px);
  gap: 20px;
  justify-content: center;
`;
const Searchbar = styled.div`
  margin: 20px;
  display: flex;
  .search-bar {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 30px;
    padding: 5px 10px;
    background-color: #fff;
    width: 100%;
    height: 50px;
    /* max-width: 500px; */

    input {
      border: none;
      outline: none;
      flex: 1;
      padding: 0 15px;
      font-size: 16px;
    }

    .icon {
      font-size: 20px;
      color: #999;
      cursor: pointer;
    }

    .search-icon {
      margin-left: 10px;
    }

    .filter-icon {
      margin-right: 10px;
      &:hover {
        cursor: pointer;
      }
    }
    .filter-open {
      z-index: 101;
    }
  }
`;

const Course = () => {
  const token = localStorage.getItem('token');

  const [filter, setFilter] = useState(['最新到舊', '最愛', '封存']);
  const [classes, setClasses] = useState([]);

  const markdownContent = marked(`## Teacher 的課程`);

  // fetch while clicking
  const handlerFavorite = async () => {
    try {
      const response = await axios.get('http://localhost:5000/favorites', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { favorites } = response.data;
      setClasses(favorites);
    } catch (error) {
      console.error(error);
    }
  };

  // fetch every time
  const getCourseData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/courses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { courses } = response.data;
      console.log(courses);
      setClasses(courses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCourseData();
  }, []);

  // const toggleFavorite = (index) => {
  //   setClasses(
  //     classes.map((item, i) => {
  //       if (i === index) {
  //         return { ...item, isFavorite: !item.isFavorite };
  //       }
  //       return item;
  //     })
  //   );
  // };

  // const handlerFilter = (e) => {
  //   console.log(e.currentTarget);
  //   e.currentTarget.children[1].classList.toggle('open');
  //   setFilter(true);
  // };

  return (
    <div>
      {/* search bar */}
      <Section className="right">
        {/* <Searchbar> */}
        {/* <div class="search-bar">
            <ButtonIcon>
              <Search />
            </ButtonIcon>
            <input type="text" placeholder="搜尋課程" />
            <div class="filter-open" onClick={handlerFilter}>
              <motion.div>
                <Fliter>
                  <a>最新到舊</a>
                  <a>星號優先</a>
                  <a>封存</a>
                </Fliter>
              </motion.div>
            </div>
          </div> */}
        {/* </Searchbar> */}
        <div className="markdown-body">
          <div dangerouslySetInnerHTML={{ __html: markdownContent }} />
        </div>
        {/* <Reorder.Group
          as="ul"
          axis="x"
          onReorder={setFilter}
          className="tabs"
          values={filter}
        >
          {filter.map((item) => (
            <Reorder.Item key={item} value={item}>
              (item === '最愛')
              <Button className="白">{item}</Button>
            </Reorder.Item>
          ))}
        </Reorder.Group> */}
        <ul className="tabs">
          <li>
            <a href="/course">
              <Button className="白">所有課程</Button>
            </a>
          </li>
          <li>
            <Button onClick={handlerFavorite} className="白">
              <div className="iconFlex">
                <Star />
                最愛
              </div>
            </Button>
          </li>
          <li>
            <Button className="白">
              <div className="iconFlex">
                <Pen />
                編輯
              </div>
            </Button>
          </li>
        </ul>
        <FlexCard>
          {classes.map(({ id, isFavorite }, index) => (
            <CourseCard
              key={id}
              is_favorite={classes[index].is_favorite}
              name={classes[index].name}
              id={classes[index].id}
              image={dataClasses[index].image}
            />
          ))}
        </FlexCard>
      </Section>
    </div>
  );
};

export default Course;
