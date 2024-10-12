import React from 'react'
import styled from 'styled-components'
const HomeStyle = styled.h1`
    color: red;
`


const Home = () => {
  return (
    <div className='home_link'>
      <HomeStyle>home</HomeStyle>
    </div>
  )
}

export default Home
