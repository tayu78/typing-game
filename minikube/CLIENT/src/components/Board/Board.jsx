import React from "react";
import styled from "styled-components";
import { Content } from "../../routes/Content";

function Board() {
  return (
    <Greeen>
      <Black>
        <Content />
      </Black>
    </Greeen>
  );
}

// styled components
const Greeen = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: 60px;
  width: 630px;
  height: 450px;
  background: #17825d;
  box-shadow: rgb(0, 0, 0) 5px 5px 3px;
`;

const Black = styled.div`
  position: absolute;
  padding: 30px;
  box-sizing: border-box;
  top: 10px;
  left: 10px;
  width: 610px;
  height: 430px;
  background: #1f1f1f;
  margin: 0 auto;
`;

export default Board;
