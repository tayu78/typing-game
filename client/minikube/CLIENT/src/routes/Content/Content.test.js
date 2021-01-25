import { fireEvent, render, screen } from "@testing-library/react";
import Content from "./Content";

describe("Content", () => {
  test("render title content", () => {
    render(<Content />);
    screen.getByText("NS-TYPING");
    screen.getByText("数字・記号専用のタイピング練習ゲーム");
    screen.getByText("スペースキーを押すと開始します");
  });

  test("spacekey down and then Game start", () => {
    render(<Content />);
    fireEvent.keyPress(document, { key: " " });
    setTimeout(() => {
      screen.getByText("表示された数字または記号のキーを押してください");
      screen.getByTestId("symbol");
      screen.getByText("問題数:10");
      screen.getByText("正解数:0");
      screen.getByText("タイトルに戻る");
    }, 5000);
  });

  test("user  press correct  symbol and then go to next question", () => {
    render(<Content />);
    fireEvent.keyPress(document, { key: " " });

    setTimeout(() => {
      screen.getByText("問題数:10");
      fireEvent.keyPress(document, {
        key: screen.getByTestId("symbol").textContent,
      });
    }, 5000);
    setTimeout(() => {
      screen.getByText("問題数:9");
    }, 5000);
  });

  test("restSymbolNumber = 0 and then display results, user press wrong key and then incorrecutNumber change", () => {
    render(<Content />);
    fireEvent.keyPress(document, { key: " " }); //game start
    setTimeout(() => {
      for (let i = 0; i < 9; i++) {
        setTimeout(() => {
          fireEvent.keyPress(document, {
            key: screen.getByTestId("symbol").textContent,
          });
        }, 3000);
      }
      fireEvent.keyPress(document, { key: "a" }); // press wrong key
      fireEvent.keyPress(document, {
        key: screen.getByTestId("symbol").textContent,
      });
      setTimeout(() => {
        screen.getByText("結果");
        screen.getByText("ミスタイプ数:1");
      }, 3000);
    }, 5000);
  });
});
