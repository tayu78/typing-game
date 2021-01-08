import { render, screen } from "@testing-library/react";
import Results from "./Results";

test("render results gived by props", () => {
  let elapssedTime = 10000;
  const incorrectNumber = 2;
  const handleClick = jest.fn();

  render(
    <Results
      elapssedTime={elapssedTime}
      incorrectNumber={incorrectNumber}
      onClick={handleClick}
    />
  );
  screen.getByText("経過時間:");
  screen.getByText("00:10:00");
  screen.getByText("正しく打ったキーの数:");
  screen.getByText("10");
  screen.getByText(/平均キータイプ数:/);
  screen.getByText("1.0");
  screen.getByText(/回\/秒/);
  screen.getByText(/正解率:/);
  screen.getByText("83");
  screen.getByText(/%/);
  screen.getByText("タイトルに戻る");

  // screen.debug();
});
