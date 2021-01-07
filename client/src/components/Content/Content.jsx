import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Symbol } from "../Symbol";
import { Results } from "../Results";
import { Button } from "../Button";

function Content() {
  const [isSpaceKeyDowned, setIsSpaceKeyDowned] = useState(false); //タイトル画面でスペースキーが押されたかどうか
  const [restSymbolNumber, setRestSymbolNumber] = useState(10); //残りの問題数
  const [currentSymbol, setCurrentSymbol] = useState(""); //表示する記号
  const [incorrectNumber, setIncorrectNumber] = useState(0); //間違えてタイピングした数
  const [elapssedTime, setElapssedTime] = useState(0); //経過時間
  const [startTime, setStartTime] = useState(0); //開始時間

  const handleKeyPress = useCallback(
    async (e) => {
      let KeyName = e.key;
      if (KeyName === " ") {
        //タイトル画面でスペースキーが押されたかどうかを判定し、押されたらゲームスタート
        e.preventDefault();
        setIsSpaceKeyDowned(true);
        setStartTime(Date.now());
      } else if (KeyName === currentSymbol) {
        //ユーザーが正しい記号を入力したら残りの問題数の更新、次に表示する記号の更新、記号リストを表示された記号は削除して更新
        await getSymbol();
        setRestSymbolNumber(restSymbolNumber - 1);
      } else {
        //ゲームプレイ画面かどうかの確認をし、プレイ画面で間違った記号が押されたら、innCorrectNumberを更新
        isSpaceKeyDowned && setIncorrectNumber(incorrectNumber + 1);
        return;
      }
    },
    [currentSymbol, incorrectNumber, isSpaceKeyDowned, restSymbolNumber]
  );

  function getSymbol() {
    fetch("http://localhost:4000/graphql", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: "{ symbol }" }),
    })
      .then((r) => r.json())
      .then((data) => {
        setCurrentSymbol(data.data.symbol);
        console.log(data);
      });
  }

  //タイトルへ戻るボタンが押されたときの処理
  const handleClick = (e) => {
    setIsSpaceKeyDowned(false);
    setRestSymbolNumber(10);
    setIncorrectNumber(0);
  };

  useEffect(() => {
    getSymbol();
  }, []);

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    if (restSymbolNumber === 0) {
      setElapssedTime(Date.now() - startTime);
    }
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [handleKeyPress, restSymbolNumber, startTime]);

  return (
    <>
      {isSpaceKeyDowned ? (
        restSymbolNumber ? (
          <div>
            <PleaseKeyDown>
              表示された数字または記号のキーを押してください
            </PleaseKeyDown>
            <Symbol currentSymbol={currentSymbol} />
            <Container>
              <Num>問題数:{restSymbolNumber}</Num>
              <Num>正解数:{10 - restSymbolNumber}</Num>
              <Button onClick={handleClick} />
            </Container>
          </div>
        ) : (
          <Results
            onClick={handleClick}
            incorrectNumber={incorrectNumber}
            restSymbolNumber={restSymbolNumber}
            elapssedTime={elapssedTime}
          />
        )
      ) : (
        <div>
          <Title>NS-TYPING</Title>
          <SubTitle>数字・記号専用のタイピング練習ゲーム</SubTitle>
          <Start>スペースキーを押すと開始します</Start>
        </div>
      )}
    </>
  );
}

// styled components
const PleaseKeyDown = styled.p`
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-family: Arial;
`;
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

const Container = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Num = styled.p`
  color: #fff;
  display: inline-block;
`;

export default Content;
