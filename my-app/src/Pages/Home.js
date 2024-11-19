import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const HomeStyle = styled.div`
  background: linear-gradient(180deg, #fff 0%, #99f6e4 100%);
  height: 100vh;
  width: 100vw;
`;

const Home = () => {
  return (
    <div>
      <HomeStyle></HomeStyle>
    </div>
  );
};

export default Home;
