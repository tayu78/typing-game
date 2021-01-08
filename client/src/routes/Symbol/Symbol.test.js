import { render, screen } from "@testing-library/react";
import Symbol from "./Symbol";

test("render currentSymbol gived by props", () => {
  let props = "!";
  const { rerender } = render(<Symbol currentSymbol={props} />);
  expect(screen.getByText("!")).toBeInTheDocument();

  props = "#";
  rerender(<Symbol currentSymbol={props} />);
  expect(screen.queryByText("!")).toBeNull();
  expect(screen.getByText("#")).toBeInTheDocument();
});
