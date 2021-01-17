import { render, screen } from "@testing-library/react";
import Loading from "./Loading";

test("render loading screen", () => {
  render(<Loading />);
  screen.getByText("Loading...");
});
