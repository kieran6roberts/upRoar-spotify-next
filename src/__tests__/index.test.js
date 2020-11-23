import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../../pages/index";

describe("<Home /> page", () => {
  test("renders", () => {
    render(<Home />);
    expect(screen.getByText(/upRoar/)).toBeInTheDocument();
  });
});