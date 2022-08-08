import React from "react";
import styled from "styled-components";

export default function Loading() {
  return (
    <>
      <LoadingIcon>Loading...</LoadingIcon>
    </>
  );
}

const LoadingIcon = styled.div`
  color: white;
  text-align: center;
  margin-top: 180px;
`;
