import React from 'react';
import styled from 'styled-components';

function Button(props) {
  return (
    
    <Btn onClick={props.onClick}>タイトルに戻る</Btn>
  );

}


const Btn = styled.button`
height: 30px;
line-height: 30px;
font-size:15px;
background-color: rgb(14, 99, 156);
color:#fff;
padding: 0px 15px;
box-sizing: border-box;
border: 0;
align-self: center;

`

export default Button;