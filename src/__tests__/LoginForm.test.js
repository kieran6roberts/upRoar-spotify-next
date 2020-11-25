import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as nextRouter from "next/router";

jest.mock("../containers/Layout/Layout", () => "div");
import Login from "../../pages/login";
import { useRouter } from "next/router";

afterEach(() => {
  jest.clearAllMocks();
  cleanup;
});

describe("Custom hook for login form", () => {
  nextRouter.useRouter = jest.fn().mockImplementation(() => ({push: jest.fn()}));

  test("<Login /> page renders", () => {
    const { getByText, getByTestId } = render(<Login />);
    expect(getByText(/Already have an account?/i)).toBeInTheDocument();
    expect(getByText(/Sign in below./i)).toBeInTheDocument();
    expect(getByTestId("login-form")).toBeInTheDocument();
  });

  test("<Login /> input fields update", () => {
    const { getByLabelText } = render(<Login />);

    const usernameInput = getByLabelText(/username/i);
    const passwordInput = getByLabelText(/password/i);

    expect(usernameInput.textContent).toBe("");
    expect(passwordInput.textContent).toBe("");

    userEvent.type(usernameInput, "joe74");
    userEvent.type(passwordInput, "abcdefg");
    expect(usernameInput).toHaveValue("joe74");
    expect(passwordInput).toHaveValue("abcdefg");
  });

  test("validation", () => {
    const { getByLabelText, getByTestId, queryByText } = render(<Login />);
    const form = getByTestId("login-form");
    const usernameInput = getByLabelText(/username/i);
    const passwordInput = getByLabelText(/password/i);

    fireEvent.submit(form);
    expect(queryByText("Username required!")).toBeInTheDocument();
    expect(queryByText("Password required!")).toBeInTheDocument();

    userEvent.type(usernameInput, "joe74");
    fireEvent.submit(form);
    expect(queryByText("Username required!")).not.toBeInTheDocument();
    expect(queryByText("Password required!")).toBeInTheDocument();

    userEvent.type(passwordInput, "sfasd");
    fireEvent.submit(form);
    expect(queryByText("Username required!")).not.toBeInTheDocument();
    expect(queryByText("Password required!")).not.toBeInTheDocument();
    expect(useRouter).toHaveBeenCalled();
  });
});