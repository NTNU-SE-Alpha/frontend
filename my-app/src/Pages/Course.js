import React from 'react'
import styled from 'styled-components'
import CourseCard from '../Components/CourseCard';
const FlexCard = styled.div`
  display: flex;
  width: 100%;
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
    padding: 0 10px;
    font-size: 16px;
  }

  .icon {
    font-size: 20px;
    color: #999;
    cursor: pointer;
  }

  .search-icon {
    margin-right: 10px;
  }

  .filter-icon {
    margin-left: 10px;
  }
}

`;
// const classes = [
//   {
//     id: 1,
//     name: "Mathematics",
//     teacher: "Mr. Chen",
//     weekday: "Monday",
//     semester: "2024 Spring",
//     archive: false
//   },
//   {
//     id: 2,
//     name: "Physics",
//     teacher: "Mrs. Wang",
//     weekday: "Wednesday",
//     semester: "2024 Spring",
//     archive: false
//   },
//   {
//     id: 3,
//     name: "Chemistry",
//     teacher: "Mr. Li",
//     weekday: "Friday",
//     semester: "2024 Fall",
//     archive: true
//   }
// ];

const Course = () => {
  return (
    <div>
        {/* search bar */}
        <Searchbar>
        <div class="search-bar">
          <span class="material-symbols-outlined">search</span>
          <input type="text" placeholder="搜尋課程" />
          <span class="material-symbols-outlined">filter_alt</span>
        </div>
        </Searchbar>
        <FlexCard>
            <CourseCard />
            <CourseCard />
            <CourseCard />
        </FlexCard>
    </div>
  )
}

export default Course
