import React from 'react';
import styled from "styled-components";


function AppHeader() {
  return (
    <Header>
      <Title>NS-TYPING</Title>
    </Header>
  );
}


// styled components

const Header = styled.div`
background: #007ACC;
height:80px;
line-height:80px;
text-align: center;
width:100%;
`

const Title = styled.p`
display:inline-block;
text-align: center;
color:white;
transform: scale(2,1);
margin:0;
font-size:50px;
line-height:80px;
font-family:impact;
text-shadow:rgb(0,0,0) 1px 2px;
`


export default AppHeader;