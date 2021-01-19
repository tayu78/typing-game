import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Top } from "../Top";
import { Results } from "../Results";
import { Play } from "../Play";

function Content() {
  const [isSpaceKeyDowned, setIsSpaceKeyDowned] = useState(false); //タイトル画面でスペースキーが押されたかどうか
  const [restSymbolNumber, setRestSymbolNumber] = useState(10); //残りの問題数
  const [symbols, setSymbols] = useState(); //記号のリスト
  const [currentSymbol, setCurrentSymbol] = useState(""); //表示する記号
  const [incorrectNumber, setIncorrectNumber] = useState(0); //間違えてタイピングした数
  const [startTime, setStartTime] = useState(0); //開始時間
  const [countdown, setCountdown] = useState(3);

  const handleKeyPress = useCallback(
    (e) => {
      let KeyName = e.key;
      if (KeyName === " ") {
        //タイトル画面でスペースキーが押されたかどうかを判定し、押されたらゲームスタート
        if (restSymbolNumber !== 0) {
          e.preventDefault();
          setIsSpaceKeyDowned(true);
          setTimeout(() => {
            setCountdown(2);
          }, 1000);
          setTimeout(() => {
            setCountdown(1);
          }, 2000);
          setTimeout(() => {
            setCountdown(false);
            setStartTime(Date.now());
          }, 3000);
        }
        e.preventDefault();
      } else if (KeyName === currentSymbol) {
        //ユーザーが正しい記号を入力したら残りの問題数の更新、次に表示する記号の更新、記号リストを表示された記号は削除して更新
        setRestSymbolNumber(restSymbolNumber - 1);
        console.log(symbols);
        setCurrentSymbol(
          symbols.splice(Math.floor(Math.random() * symbols.length), 1)[0]
        );
        setSymbols(symbols);
      } else if (restSymbolNumber === 0) {
        //結果画面でキー入力をさせないようにする
        document.removeEventListener("keypress", handleKeyPress);
      } else {
        //ゲームプレイ画面かどうかの確認をし、プレイ画面で間違った記号が押されたら、innCorrectNumberを更新
        isSpaceKeyDowned && setIncorrectNumber(incorrectNumber + 1);
      }
    },
    [
      currentSymbol,
      incorrectNumber,
      isSpaceKeyDowned,
      restSymbolNumber,
      symbols,
    ]
  );

  const getSymbol = useCallback(() => {
    fetch("https://us-central1-yuya78-api.cloudfunctions.net/api/graphql", {
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
        let ary = data.data.symbol.split(" ");
        setCurrentSymbol(
          ary.splice(Math.floor(Math.random() * ary.length), 1)[0]
        );
        setSymbols(ary);
        console.log(data);
        console.log(typeof data.data.symbol);
      })
      .catch(() => console.log("error"));
  }, []);

  //タイトルへ戻るボタンが押されたときの処理
  const handleClick = (e) => {
    getSymbol();
    setIsSpaceKeyDowned(false);
    setRestSymbolNumber(10);
    setIncorrectNumber(0);
    setCountdown(3);
  };

  //APIを叩く
  useEffect(() => {
    getSymbol();
  }, [getSymbol]);

  // keypressイベントの追加
  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [handleKeyPress, restSymbolNumber, startTime]);

  return (
    <>
      {isSpaceKeyDowned ? (
        restSymbolNumber ? (
          countdown ? (
            <CountDown>{countdown}</CountDown>
          ) : (
            <Play
              currentSymbol={currentSymbol}
              restSymbolNumber={restSymbolNumber}
              handleClick={handleClick}
            />
          )
        ) : (
          <Results
            onClick={handleClick}
            incorrectNumber={incorrectNumber}
            restSymbolNumber={restSymbolNumber}
            startTime={startTime}
          />
        )
      ) : (
        <Top />
      )}
    </>
  );
}

//styled components
const CountDown = styled.div`
  font-size: 100px;
  color: white;
  text-align: center;
  margin-top: 100px;
`;

export default Content;
