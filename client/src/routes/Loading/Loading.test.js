import { render, screen } from "@testing-library/react";
import Loading from "./Loading";

test("render game play screen", () => {
  render(<Loading />);
  screen.getByText("Loading...");
});
