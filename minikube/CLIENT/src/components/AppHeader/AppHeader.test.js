import { render, screen } from "@testing-library/react";
import AppHeader from "./AppHeader";

test("render AppHeader", () => {
  render(<AppHeader />);
  expect(screen.getByText("NS-TYPING")).toBeInTheDocument();
});
