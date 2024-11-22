import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CourseCard from '../Components/CourseCard';
import { motion } from 'framer-motion';
import classData from '../Data/classData';
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
  const [filter, setFilter] = useState(false);
  const [classes, setClasses] = useState(classData);
  const toggleFavorite = (index) => {
    setClasses(
      classes.map((item, i) => {
        if (i === index) {
          return { ...item, isFavorite: !item.isFavorite };
        }
        return item;
      })
    );
  };
  // const fetchData = async () => {
  //   try {
  //     // 遍歷每一個課程，分別進行圖片查詢
  //     const updatedClasses = await Promise.all(
  //       classes.map(async (item) => {
  //         const response = await client.photos.search({ query: item.name, locale: 'zh-TW' });
  //         // 若 API 回傳結果包含圖片，則更新圖片，否則保持原圖片
  //         const imageUrl = response.photos.length > 0 ? response.photos[0].src.medium : item.image;
  //         return { ...item, image: imageUrl };
  //       })
  //     );
  //     // 更新課程資料
  //     setClasses(updatedClasses);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const handlerFilter = (e) => {
    console.log(e.currentTarget);
    e.currentTarget.children[1].classList.toggle('open');
    setFilter(true);
  };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div>
      {/* search bar */}
      <Section className="right">
        <Searchbar>
          <div class="search-bar">
            <span className="material-symbols-outlined search-icon">
              search
            </span>
            <input type="text" placeholder="搜尋課程" />
            {/* filter */}
            <div class="filter-open" onClick={handlerFilter}>
              <svg
                className="filter-icon"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="6E6E6E"
              >
                <path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Z" />
              </svg>
              <motion.div frame>
                <Fliter>
                  <a>最新到舊</a>
                  <a>星號優先</a>
                  <a>封存</a>
                </Fliter>
              </motion.div>
            </div>
          </div>
        </Searchbar>
        <FlexCard>
          {classes.map(({ id, isFavorite, order }, index) => (
            <CourseCard
              key={id}
              isFavorite={isFavorite}
              toggleFavorite={() => toggleFavorite(index)}
              image={classes[index].image}
              name={classes[index].name}
              id={classes[index].id}
            />
          ))}
        </FlexCard>
      </Section>
    </div>
  );
};

export default Course;
