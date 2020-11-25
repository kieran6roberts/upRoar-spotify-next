import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../../pages/index";

describe("<Home /> page", () => {
  test("renders", () => {
    const { getByText, getAllByRole } = render(<Home />);
    const btns = getAllByRole("link");
    expect(getByText(/play your favourite songs/i)).toBeInTheDocument();
    expect(btns[0]).toBeInTheDocument();
    expect(btns[1]).toBeInTheDocument();
    expect(btns[2]).toBeInTheDocument();
    expect(btns[3]).toBeInTheDocument();
    expect(btns[4]).toBeInTheDocument();
    expect(btns[5]).toBeInTheDocument();
  });
});