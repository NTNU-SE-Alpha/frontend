import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CourseCard from '../Components/CourseCard';
import { createClient } from 'pexels';
const client = createClient(process.env.REACT_APP_PEXELS_API);
const Fliter = styled.div`
  z-index: 101;
  /* background-color: #fff; */
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  border-radius: 20px;
  /* border: 1px solid red; */
  width: fit-content;
  padding: 10px;
  position: absolute;
  top: 70px;
  right: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  height: 0;
  overflow: hidden;
  transition: height 0.3s;
  &.open{
    height: fit-content;
  }
  a{
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
  .filter-open{
    z-index: 101;
  }
}

`;


const Course = () => {
  const [filter, setFilter] = useState(false);
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "軟體工程",
      teacher: "Mr. Chen",
      weekday: "Monday",
      semester: "2024 Spring",
      archive: false,
      isFavorite: false,
      image: "images/c1.png",
      order: 1
    },
    {
      id: 2,
      name: "資訊科技",
      teacher: "Mrs. Wang",
      weekday: "Wednesday",
      semester: "2024 Spring",
      archive: false,
      isFavorite: false,
      image: "images/c1.png",
      order: 2
    },
    {
      id: 3,
      name: "化學",
      teacher: "Mr. Li",
      weekday: "Friday",
      semester: "2024 Fall",
      archive: true,
      isFavorite: false,
      image: "images/loginbg.png",
      order: 3
    },
    {
      id: 4,
      name: "生物",
      teacher: "Mrs. Chang",
      weekday: "Tuesday",
      semester: "2024 Fall",
      archive: true,
      isFavorite: false,
      image: "images/c1.png",
      order: 4
    },
    {
      id: 5,
      name: "數學",
      teacher: "Mr. Zhang",
      weekday: "Thursday",
      semester: "2024 Spring",
      archive: false,
      isFavorite: false,
      image: "images/c2.png",
      order: 5
    },
    {
      id: 6,
      name: "物理",
      teacher: "Mrs. Liu",
      weekday: "Monday",
      semester: "2024 Spring",
      archive: false,
      isFavorite: true,
      image: "images/c3.png",
      order: 6
    },
    {
      id: 7,
      name: "地理",
      teacher: "Mr. Wu",
      weekday: "Wednesday",
      semester: "2024 Fall",
      archive: true,
      isFavorite: false,
      image: "images/c4.png",
      order: 7
    },
    {
      id: 8,
      name: "歷史",
      teacher: "Mrs. Lin",
      weekday: "Friday",
      semester: "2024 Fall",
      archive: true,
      isFavorite: false,
      image: "images/c5.png",
      order: 8
    },
    {
      id: 9,
      name: "英文",
      teacher: "Mr. Huang",
      weekday: "Tuesday",
      semester: "2024 Spring",
      archive: false,
      isFavorite: true,
      image: "images/c6.png",
      order: 9
    },
    {
      id: 10,
      name: "體育",
      teacher: "Mrs. Yang",
      weekday: "Thursday",
      semester: "2024 Spring",
      archive: false,
      isFavorite: false,
      image: "images/c7.png",
      order: 10
    },
    {
      id: 11,
      name: "美術",
      teacher: "Mr. Xu",
      weekday: "Monday",
      semester: "2024 Fall",
      archive: true,
      isFavorite: false,
      image: "images/c8.png",
      order: 11
    },
    {
      id: 12,
      name: "音樂",
      teacher: "Mrs. Gao",
      weekday: "Wednesday",
      semester: "2024 Spring",
      archive: false,
      isFavorite: true,
      image: "images/c9.png",
      order: 12
    },
    {
      id: 13,
      name: "編程",
      teacher: "Mr. Qian",
      weekday: "Friday",
      semester: "2024 Fall",
      archive: true,
      isFavorite: false,
      image: "images/c10.png",
      order: 13
    },
  ]);
  const toggleFavorite = (index) => {
    setClasses(classes.map((item, i) => {
      if (i === index) {
        return { ...item, isFavorite: !item.isFavorite };
      }
      return item;
    }));
  };
  const fetchData = async () => {
    try {
      // 遍歷每一個課程，分別進行圖片查詢
      const updatedClasses = await Promise.all(
        classes.map(async (item) => {
          const response = await client.photos.search({ query: item.name, locale: 'zh-TW' });
          // 若 API 回傳結果包含圖片，則更新圖片，否則保持原圖片
          const imageUrl = response.photos.length > 0 ? response.photos[0].src.medium : item.image;
          return { ...item, image: imageUrl };
        })
      );
      // 更新課程資料
      setClasses(updatedClasses);
    } catch (error) {
      console.error(error);
    }
  };
  const handlerFilter = (e) => {
    console.log(e.target.children);
    e.target.children.classList.toggle('open');
    setFilter(true);
  }
  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div>
        {/* search bar */}
        <Section className='right'>
        <Searchbar>
          <div class="search-bar">
            <span className="material-symbols-outlined search-icon">search</span>
            <input type="text" placeholder="搜尋課程" />
            {/* filter */}
            <div class="filter-open" onClick={handlerFilter}>
              <svg className='filter-icon' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="6E6E6E"><path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Z"/></svg>
            <Fliter>
                <a>最新到舊</a>
                <a>星號優先</a>
                <a>封存</a>
            </Fliter></div>
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
                id = {classes[index].id}
              />
            ))}
          </FlexCard>
        </Section>
    </div>
  )
}

export default Course
