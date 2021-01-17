import { render, screen } from "@testing-library/react";
import Top from "./Top";

test("render title content", () => {
  render(<Top />);
  screen.getByText("NS-TYPING");
  screen.getByText("数字・記号専用のタイピング練習ゲーム");
  screen.getByText("スペースキーを押すと開始します");
});
