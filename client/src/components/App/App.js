import React from "react";
import styled from "styled-components";
import { AppHeader } from "../AppHeader";
import { Board } from "../Board";

function App() {
  return (
    <Body>
      <AppHeader />
      <Board />
    </Body>
  );
}

// styled components
const Body = styled.div`
  background: #dedede;
  height: 100vh;
  background-image: linear-gradient(
    rgb(236, 235, 235) 50%,
    transparent 50%,
    transparent
  );
  background-size: 5px 5px;
`;

export default App;
