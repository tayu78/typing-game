import React, { useState, useEffect, useCallback } from "react";

import { Top } from "../Top";
import { Results } from "../Results";
import { Play } from "../Play";
import { Loading } from "../Loading";

function Content() {
  const [isSpaceKeyDowned, setIsSpaceKeyDowned] = useState(false); //タイトル画面でスペースキーが押されたかどうか
  const [restSymbolNumber, setRestSymbolNumber] = useState(10); //残りの問題数
  const [symbols, setSymbols] = useState(); //記号のリスト
  const [currentSymbol, setCurrentSymbol] = useState(""); //表示する記号
  const [incorrectNumber, setIncorrectNumber] = useState(0); //間違えてタイピングした数
  const [startTime, setStartTime] = useState(0); //開始時間
  const [loading, setLoading] = useState(true);

  const handleKeyPress = useCallback(
    (e) => {
      let KeyName = e.key;
      if (KeyName === " ") {
        //タイトル画面でスペースキーが押されたかどうかを判定し、押されたらゲームスタート
        if (restSymbolNumber !== 0) {
          e.preventDefault();
          setIsSpaceKeyDowned(true);
          setStartTime(Date.now());
        }
      } else if (KeyName === currentSymbol) {
        //ユーザーが正しい記号を入力したら残りの問題数の更新、次に表示する記号の更新、記号リストを表示された記号は削除して更新
        setRestSymbolNumber(restSymbolNumber - 1);
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
    fetch("http://go-api-gateway.com/graphql", {
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
        setLoading(false);
      })
      .catch(() => console.log("error"));
  }, []);

  //タイトルへ戻るボタンが押されたときの処理
  const handleClick = async (e) => {
    getSymbol();
    setLoading(true);
    setIsSpaceKeyDowned(false);
    setRestSymbolNumber(10);
    setIncorrectNumber(0);
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
        loading ? (
          <Loading />
        ) : restSymbolNumber ? (
          <Play
            currentSymbol={currentSymbol}
            restSymbolNumber={restSymbolNumber}
            handleClick={handleClick}
          />
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

export default Content;
