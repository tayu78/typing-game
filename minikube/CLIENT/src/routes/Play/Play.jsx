import React from "react";
import styled from "styled-components";
import { Symbol } from "../Symbol";
import { Button } from "../../components/Button";

export default function Play(props) {
  return (
    <>
      <div>
        <PleaseKeyDown>
          表示された数字または記号のキーを押してください
        </PleaseKeyDown>
        <Symbol currentSymbol={props.currentSymbol} />
        <Container>
          <Num>問題数:{props.restSymbolNumber}</Num>
          <Num>正解数:{10 - props.restSymbolNumber}</Num>
          <Button onClick={props.handleClick} />
        </Container>
      </div>
    </>
  );
}

//styled components

const PleaseKeyDown = styled.p`
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-family: Arial;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Num = styled.p`
  color: #fff;
  display: inline-block;
`;
