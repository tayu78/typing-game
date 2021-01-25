import { render, screen } from "@testing-library/react";
import Results from "./Results";

test("render results gived by props", () => {
  let startTime = Date.now();
  const incorrectNumber = Math.floor(Math.random() * 10);
  const handleClick = jest.fn();

  setTimeout(() => {
    render(
      <Results
        incorrectNumber={incorrectNumber}
        onClick={handleClick}
        startTime={startTime}
      />
    );
    screen.getByText("Loading...");
    setTimeout(() => {
      screen.getByText("経過時間:00:20:00");
      screen.getByText("正しく打ったキーの数:");
      screen.getByText("10");
      screen.getByText("平均キータイプ数:0.5回/秒");
      screen.getByText(`ミスタイプ数:${incorrectNumber}`);
      screen.getByText(
        `正解率:${Math.floor((100 * 10) / (10 + incorrectNumber))}%`
      );
      screen.getByText("タイトルに戻る");
    }, 5000);
  }, 20000);
});
