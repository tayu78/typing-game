import React from "react";
import styled from "styled-components";

function Symbol(props) {
  return (
    <DisplaySymbol data-testid="symbol" id="symbol">
      {props.currentSymbol}
    </DisplaySymbol>
  );
}

// styled component
const DisplaySymbol = styled.p`
  color: #fff;
  text-align: center;
  font-size: 90px;
`;
export default Symbol;
