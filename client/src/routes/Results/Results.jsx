import React from "react";
import styled from "styled-components";
import { Button } from "../../components/Button";

function Results(props) {
  const elapssedTime = props.elapssedTime;
  //elapssedTimeを表示用に整える
  const d = new Date(elapssedTime);
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  const ms = String(Math.round(d.getMilliseconds() / 10)).padStart(2, 0);
  const fixedElapssedTime = (elapssedTime / 1000).toFixed(2);
  return (
    <>
      <Title>結果</Title>
      <Ul>
        <ResultList>
          経過時間: <Bulue>{`${m}:${s}:${ms}`}</Bulue>
        </ResultList>
        <ResultList>
          正しく打ったキーの数:<Bulue>10</Bulue>
        </ResultList>
        <ResultList>
          平均キータイプ数:<Bulue> {(10 / fixedElapssedTime).toFixed(1)}</Bulue>
          回/秒
        </ResultList>
        <ResultList>
          ミスタイプ数: <Bulue> {props.incorrectNumber} </Bulue>
        </ResultList>
        <ResultList>
          正解率:{" "}
          <Bulue>{Math.floor((100 * 10) / (10 + props.incorrectNumber))}</Bulue>{" "}
          %
        </ResultList>
      </Ul>
      <Center>
        <Button onClick={props.onClick} />
      </Center>
    </>
  );
}

// styled component
const Title = styled.p`
  text-align: center;
  color: #fff;
  font-size: 50px;
  font-family: Arial, Helvetica, sans-serif;
  margin: 45px 0px 40px 0px;
`;

const ResultList = styled.li`
  color: #fff;
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
  ${"" /* text-align:center; */}
`;

const Bulue = styled.span`
  color: #007acc;
  font-size: 20px;
  font-weight: bold;
  ${"" /* font-weight: bold; */}
`;
const Ul = styled.ul`
  padding-left: 80px;
`;

const Center = styled.div`
  display: inline-block;
  margin: 20px 200px 0px 200px;
`;
export default Results;
