import { fireEvent, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import * as React from "react";

import RegisterForm from "@/containers/Forms/RegisterForm/RegisterForm";

import { render } from "../../test-utils";

jest.mock("next/router");
jest.mock("@/utility/fetcher", () => ({
    fetcher: jest.fn().mockResolvedValue({
        jwt: "mock return jwt",
        statusCode: 200,
        user: {
          username: "kieran"
        }
    })
  }));

describe("Custom hook for register form", () => {
  let expectedRouterPrefetch, expectedRouterPush;

  beforeEach(() => {
    expectedRouterPush = jest.fn();
    expectedRouterPrefetch = jest.fn();
    useRouter.mockReturnValue({
      prefetch: expectedRouterPrefetch,
      push: expectedRouterPush
     });
  });

  test("<Register /> page renders", () => {
    render(<RegisterForm />);

    expect(screen.getByTestId("register-form")).toBeInTheDocument();
  });

  test("calls submit with user input details", async () => {
    render(<RegisterForm />);

    expect(expectedRouterPrefetch).toHaveBeenCalledTimes(1);

    const user = {
      name: "kieran",
      email: "kieran@test.com",
      username: "kieran99",
      password: "kieranT1!",
      confirmPassword: "kieranT1!"
    };

    userEvent.type(screen.getByLabelText("name"), user.name);
    userEvent.type(screen.getByLabelText(/email/u), user.email);
    userEvent.type(screen.getByLabelText(/username/u), user.username);
    userEvent.type(screen.getByLabelText("password"), user.password);
    userEvent.type(screen.getByLabelText("confirm password"), user.confirmPassword);

    expect(screen.getByLabelText("name")).toHaveValue("kieran");
    expect(screen.getByLabelText(/email/u)).toHaveValue("kieran@test.com");
    expect(screen.getByLabelText(/username/u)).toHaveValue("kieran99");
    expect(screen.getByLabelText("password")).toHaveValue("kieranT1!");
    expect(screen.getByLabelText("confirm password")).toHaveValue("kieranT1!");

    fireEvent.submit(screen.getByTestId("register-form"));

    expect(await expectedRouterPush).toHaveBeenCalledTimes(1);
  });
  test("failing submit case warns user", () => {
    render(<RegisterForm />);

    const user = {
      name: "",
      email: "kieran",
      username: "",
      password: "k",
      confirmPassword: "kieran"
    };

    userEvent.type(screen.getByLabelText("name"), user.name);
    userEvent.type(screen.getByLabelText(/email/u), user.email);
    userEvent.type(screen.getByLabelText(/username/u), user.username);
    userEvent.type(screen.getByLabelText("password"), user.password);
    userEvent.type(screen.getByLabelText("confirm password"), user.confirmPassword);


    fireEvent.submit(screen.getByTestId("register-form"));

    expect(screen.getByText("Name required!")).toBeInTheDocument();
    expect(screen.getByText("Invalid email address! Please enter a valid address")).toBeInTheDocument();
    expect(screen.getByText("Username required!")).toBeInTheDocument();
    expect(screen.getByText("Password must be between 6 and 16 characters long and contain at least 1 number and 1 uppercase character!")).toBeInTheDocument();
    expect(screen.getByText("Passwords do not match! Try again")).toBeInTheDocument();
  });
});
