import React from 'react'
import styled from 'styled-components'
const HomeStyle = styled.div`
    background: linear-gradient(180deg, #B2FEE6 0%, #00E8DC 100%);
    height: 100vh;
    width: 100vw;
`


const Home = () => {
  return (
    <div>
      <HomeStyle>
        <a href='/fileupload' >fileupload</a>
      </HomeStyle>
    </div>
  )
}

export default Home
