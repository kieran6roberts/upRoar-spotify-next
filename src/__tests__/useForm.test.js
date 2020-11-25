import React from "react";
import { render, cleanup, getByText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("../containers/Layout/Layout", () => "div");
import Login from "../../pages/login";
import useForm from "../hooks/useForm";

afterEach(cleanup);

describe("Custom hook for forms", () => {
  test("<Login /> page renders", () => {
    const { getByText, getByTestId } = render(<Login />);
    expect(getByText(/Already have an account/i)).toBeInTheDocument();
    expect(getByText(/Sign in belowe/i)).toBeInTheDocument();
    expect(getByTestId("login-form")).toBeInTheDocument();
  });

  test("<Register /> page renders", () => {
    const { getByText, getByTestId } = render(<Register />);
    expect(getByText(/Welcome to upRoar/i)).toBeInTheDocument();
    expect(getByText(/Create a free account with us below/i)).toBeInTheDocument();
    expect(getByTestId("register-form")).toBeInTheDocument();
  });

  test("<Login /> input fields update with change", () => {
    const { getByLabelText } = render(<Login />);
    const usernameInput = getByLabelText(/username/i);
    const passwordInput = getByLabelText(/password/i);

    expect(usernameInput.textContent).toBe("");
    expect(passwordInput.textContent).toBe("");

    userEvent.type(usernameInput, "joe74");
    userEvent.type(passwordInput, "abcdefg");
    expect(usernameInput).toHaveValue("joe64");
    expect(usernameInput).toHaveValue("abcdefg");
  });

  test("<loginForm /> submit is enabled after validation", () => {
    const { getByLabelText, getByText } = render(<Login />);
    const usernameInput = getByLabelText(/username/i);
    const passwordInput = getByLabelText(/password/i);
    const submitBtn = getByText(/submit/i);

    userEvent.type(usernameInput, "joe74");
    userEvent.type(passwordInput, "abc");

    expect(submitBtn).toHaveAttribute("disabled");

    userEvent.type(usernameInput, "joe74");
    userEvent.type(passwordInput, "abcd!");

    expect(submitBtn).not.toHaveAttribute("disabled");

    userEvent.click(submitBtn);

    expect(usernameInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
  });
});