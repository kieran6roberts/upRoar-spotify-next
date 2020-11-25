import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as nextRouter from "next/router";

jest.mock("../containers/Layout/Layout", () => "div");
import Register from "../../pages/register";

afterEach(() => {
  jest.clearAllMocks();
  cleanup;
});

describe("Custom hook for register form", () => {
  nextRouter.useRouter = jest.fn().mockImplementation(() => ({push: jest.fn()}));
  test("<Register /> page renders", () => {
      const { getByText, getByTestId } = render(<Register />);
      expect(getByText(/Welcome to upRoar!/i)).toBeInTheDocument();
      expect(getByText(/Create a free account with us below./i)).toBeInTheDocument();
      expect(getByTestId("register-form")).toBeInTheDocument();
    });

    test("<Login /> input fields update", () => {
      const { getByLabelText, getAllByLabelText } = render(<Register />);
  
      const nameInput = getByLabelText("name");
      const emailInput = getByLabelText(/email/i);
      const usernameInput = getByLabelText(/username/i);
      const passwordInputs = getAllByLabelText(/password/i);
  
      expect(nameInput.textContent).toBe("");
      expect(emailInput.textContent).toBe("");
      expect(usernameInput.textContent).toBe("");
      expect(passwordInputs[0].textContent).toBe("");
      expect(passwordInputs[1].textContent).toBe("");
      
      userEvent.type(nameInput, "joe person");
      userEvent.type(emailInput, "joe74@gmail.com");
      userEvent.type(usernameInput, "joe74");
      userEvent.type(passwordInputs[0], "123456");
      expect(nameInput).toHaveValue("joe person");
      expect(emailInput).toHaveValue("joe74@gmail.com");
      expect(usernameInput).toHaveValue("joe74");
      expect(passwordInputs[0]).toHaveValue("123456");
    });

    test("validation", () => {
      const { queryByText, 
        getByLabelText, 
        getAllByLabelText, 
        queryAllByText,
        getByTestId } = render(<Register />);

      const nameInput = getByLabelText("name");
      const emailInput = getByLabelText(/email/i);
      const usernameInput = getByLabelText(/username/i);
      const form = getByTestId("register-form");

      fireEvent.submit(form);
      expect(queryByText("Name required!")).toBeInTheDocument();
      expect(queryByText("Email required!")).toBeInTheDocument();
      expect(queryByText("Username required!")).toBeInTheDocument();
      expect(queryAllByText("Password required!")[0]).toBeInTheDocument();
      expect(queryAllByText("Password required!")[1]).toBeInTheDocument();

      userEvent.type(nameInput, "joe person");
      userEvent.type(emailInput, "joeperson@g.com");
      userEvent.type(usernameInput, "joeperson5");

      fireEvent.submit(form);

      expect(queryByText("Name required!")).not.toBeInTheDocument();
      expect(queryByText("Email required!")).not.toBeInTheDocument();
      expect(queryByText("Username required!")).not.toBeInTheDocument();

      emailInput.textContent = "";
      userEvent.type(emailInput, "joeperson@g.com");

      expect(queryByText("Email required!")).not.toBeInTheDocument();



    });
  });