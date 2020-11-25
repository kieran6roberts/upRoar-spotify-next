import React from "react";
import { render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as nextRouter from "next/router";

jest.mock("../containers/Layout/Layout", () => "div");
import Register from "../../pages/register";

afterEach(cleanup);

describe("Custom hook for register form", () => {
  test("<Register /> page renders", () => {
      const { getByText, getByTestId } = render(<Register />);
      expect(getByText(/Welcome to upRoar!/i)).toBeInTheDocument();
      expect(getByText(/Create a free account with us below./i)).toBeInTheDocument();
      expect(getByTestId("register-form")).toBeInTheDocument();
    });
  });