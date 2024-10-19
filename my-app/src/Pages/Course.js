import React, { useState } from 'react'
import styled from 'styled-components'
import CourseCard from '../Components/CourseCard';
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
  }
}

`;


const Course = () => {
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
    }
  ]);
  const toggleFavorite = (index) => {
    setClasses(classes.map((item, i) => {
      if (i === index) {
        return { ...item, isFavorite: !item.isFavorite };
      }
      return item;
    }));
  };
  return (
    <div>
        {/* search bar */}
        <Searchbar>
        <div class="search-bar">
          <span className="material-symbols-outlined search-icon">search</span>
          <input type="text" placeholder="搜尋課程" />
          {/* filter */}
          <svg className='filter-icon' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="6E6E6E"><path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Z"/></svg>
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
    </div>
  )
}

export default Course
