import React, { useState } from 'react';
import styled from 'styled-components';

const CourseCardContainer = styled.div`
  aspect-ratio: calc(263 / 197);

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

const CourseImage = styled.img`
  /* filter: blur(3px); */
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  transition: filter 0.2s;
  &:hover {
    filter: none;
  }
`;

const CourseTitle = styled.a`
  font-size: 18px;
  text-align: center;
  width: 100%;

  color: #fff;
  padding: 12px;
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  text-decoration: none;
`;

const CourseCard = ({ isFavorite, toggleFavorite, image, name, id }) => {
  const [isFilled, setIsFilled] = useState(false);

  const StarHandler = () => {
    setIsFilled(!isFilled);
  };
  return (
    <CourseCardContainer>
      {isFilled ? (
        // 實心星星
        <svg
          onClick={StarHandler}
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#FFFF55"
        >
          <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
        </svg>
      ) : (
        // 空心星星
        <svg
          onClick={StarHandler}
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#434343"
        >
          <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" />
        </svg>
      )}
      <CourseImage src={image} alt="課程圖片" />
      <CourseTitle href={`/course/${id}`}>{name}</CourseTitle>
    </CourseCardContainer>
  );
};

export default CourseCard;
