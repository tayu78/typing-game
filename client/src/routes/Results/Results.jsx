import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { Button } from "../../components/Button";
import { Loading } from "../Loading";

function Results(props) {
  const startTime = props.startTime;
  const elappsedTime = Date.now() - startTime;
  //elapssedTimeを表示用に整える
  const d = new Date(elappsedTime);
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  const ms = String(Math.round(d.getMilliseconds() / 10)).padStart(2, 0);
  const fixedElappsedTime = (elappsedTime / 1000).toFixed(2);
  const [averageKeyNumber, setAveragaeKeyNumber] = useState("");
  const [correctRate, setCorrectRate] = useState("");
  const [loading, setLoading] = useState(true);
  const questionNumber = 10;

  let incorrectNumber = props.incorrectNumber;
  let query = `query Result($fixedElappsedTime: String, $questionNumber: Int, $incorrectNumber: Int){ result(ElappsedTime: $fixedElappsedTime, QuestionNumber: $questionNumber, IncorrectNumber: $incorrectNumber){
    AverageKeyNumber
    CorrectRate
} }`;

  const getFetch = useCallback(async () => {
    fetch("https://us-central1-yuya78-api.cloudfunctions.net/api/graphql", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { fixedElappsedTime, questionNumber, incorrectNumber },
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        setAveragaeKeyNumber(data.data.result.AverageKeyNumber);
        setCorrectRate(data.data.result.CorrectRate);
        setLoading(false);
      });
  }, [query, fixedElappsedTime, incorrectNumber]);

  useEffect(() => {
    getFetch();
  }, [getFetch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
              平均キータイプ数:<Bulue> {averageKeyNumber}</Bulue>
              回/秒
            </ResultList>
            <ResultList>
              ミスタイプ数: <Bulue> {props.incorrectNumber} </Bulue>
            </ResultList>
            <ResultList>
              正解率: <Bulue>{correctRate}</Bulue> %
            </ResultList>
          </Ul>
          <Center>
            <Button onClick={props.onClick} />
          </Center>
        </>
      )}
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
