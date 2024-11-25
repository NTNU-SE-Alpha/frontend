import React, { useState } from 'react';
import styled from 'styled-components';
import ButtonIcon from './ButtonIcon';
import { Star } from 'lucide-react';
import axios from 'axios';

const CourseCardContainer = styled.div`
  aspect-ratio: calc(1 / 1);
  width: 263px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  img {
    /* filter: blur(3px); */
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    transition: filter 0.2s;
    &:hover {
      filter: none;
    }
  }
  div.star_title {
    position: absolute;
    top: 214px;
    display: flex;
    align-items: center;
    background-color: teal;
    width: 100%;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    a {
      font-size: 18px;
      text-align: center;
      width: 100%;
      color: #fff;
      padding: 12px;
      /* position: absolute; */
      bottom: 0;
      text-decoration: none;
    }
    button {
      margin-right: 1rem;
      svg {
        color: #fff;
        &.true {
          color: yellow;
          fill: yellow;
        }
      }
    }
  }
`;

const CourseTitle = styled.a``;

const CourseCard = ({ is_favorite, name, id, image }) => {
  const [isFilled, setIsFilled] = useState(is_favorite);
  // console.log(isFilled);
  // const StarHandler = () => {
  //   setIsFilled(!isFilled);
  // };
  const updateFavorite = (e) => {
    // console.log(e.currentTarget.children[0]);
    e.currentTarget.children[0].classList.toggle('true');
    try {
      const response = axios.put(
        `http://localhost:5000/toggle_favorite/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CourseCardContainer>
      <img src={image} alt="課程圖片" />
      <div className="star_title">
        <a href={`/course/${id}`}>{name}</a>
        <ButtonIcon onClick={updateFavorite}>
          <Star className={isFilled ? 'true' : ''} />
        </ButtonIcon>
      </div>
    </CourseCardContainer>
  );
};

export default CourseCard;
