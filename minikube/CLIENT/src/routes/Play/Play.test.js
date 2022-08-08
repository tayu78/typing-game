import { render, screen } from "@testing-library/react";
import Play from "./Play";

test("render game play screen", () => {
  const currentSymbol = "!";
  const restSymbolNumber = 10;
  const handleClick = jest.fn();

  render(
    <Play
      currentSymbol={currentSymbol}
      restSymbolNumber={restSymbolNumber}
      handleClick={handleClick}
    />
  );
  screen.getByText("表示された数字または記号のキーを押してください");
  screen.getByTestId("symbol");
  screen.getByText("!");
  screen.getByText("問題数:10");
  screen.getByText("正解数:0");
  screen.getByText("タイトルに戻る");
});
