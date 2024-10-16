import React, { Component } from 'react';
import styled from 'styled-components';

const CourseCardContainer = styled.div`
  width: 300px;
  height: 200px;
  aspect-ratio: calc(263/197);
  background-color: #e3f2fd;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 10px;
`;

const CourseImage = styled.img`
  width: 100%;
  height: 100%;
  margin-bottom: 10px;
`;

const CourseTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  padding: 0 0 10px 0;
`;

const StarIcon = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  background-color: rgba(255, 255, 255, 0);
  /* background-color: yellow; */
  /* border-radius: 50%; */
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
`;

class CourseCard extends Component {
  render() {
    return (
      <CourseCardContainer>
        <StarIcon>★</StarIcon>
        <CourseImage src='images/loginbg.png' alt="課程圖片" />
        <CourseTitle>軟體工程</CourseTitle>
      </CourseCardContainer>
    );
  }
}

export default CourseCard;
