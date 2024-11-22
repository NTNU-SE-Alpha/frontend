import React, { useState } from 'react';
import styled from 'styled-components';

const CourseCardContainer = styled.div`
  aspect-ratio: calc(16 / 3);
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  /* margin: 10px; */

  svg {
    position: absolute;
    z-index: 100;
    top: 10px;
    right: 10px;
    text-decoration: none;
    display: inline-block;
    user-select: none;
    &:hover {
      cursor: pointer;
    }
  }
  .change {
    fill: #ffff55;
  }
`;

const CourseTitle = styled.a`
  font-size: 1rem;
  text-align: center;
  width: 100%;

  color: #fff;
  padding: 12px;
  position: absolute;
  bottom: 0;
  background-color: teal;
  border-radius: 1rem;
  /* border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px; */
  text-decoration: none;
`;

const Card = (props) => {
  const name = props.name;
  return (
    <CourseCardContainer>
      <CourseTitle href={`/course/${props}`}>{name}</CourseTitle>
    </CourseCardContainer>
  );
};

export default Card;
