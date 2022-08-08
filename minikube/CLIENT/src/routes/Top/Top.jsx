import React from "react";
import styled from "styled-components";

export default function Top() {
  return (
    <>
      <div>
        <Title>NS-TYPING</Title>
        <SubTitle>数字・記号専用のタイピング練習ゲーム</SubTitle>
        <Start>スペースキーを押すと開始します</Start>
      </div>
    </>
  );
}
const Title = styled.p`
  font-family: impact;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  color: #fff;
`;

const SubTitle = styled.p`
  font-family: Hiragino;

  text-align: center;
  color: #fff;
`;
const Start = styled.p`
  color: #fff;
  text-align: center;
`;
