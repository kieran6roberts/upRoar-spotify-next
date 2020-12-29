import { configure, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import * as React from "react";

import Layout from "@/containers/Layout/Layout";

import { render } from "../../test-utils";

jest.mock("next/router");

describe("<Layout />", () => {
    let expectedPathname, expectedRouterPrefetch, expectedRouterPush;

    beforeEach(() => {
        configure({ throwSuggestions: false });
        expectedPathname = "/";
        expectedRouterPush = jest.fn();
        expectedRouterPrefetch = jest.fn();
        useRouter.mockReturnValue({
            pathname: expectedPathname,
            prefetch: expectedRouterPrefetch,
            push: expectedRouterPush
         });
    });

    test("renders with auth", () => {
        Object.defineProperty(window.document, "cookie", {
            value: "jwt=jwt;spaccess=access;sprefresh=refresh",
            writable: true
          });

        render(<Layout><button type="button">mock button</button></Layout>);

        expect(screen.getByRole("button", { name: "mock button" })).toBeInTheDocument();
        expect(expectedRouterPush).not.toHaveBeenCalled();
        expect(screen.queryByText("created and designed by kieran roberts")).not.toBeInTheDocument();
    });

    test("dark mode toggle", () => {
        render(<Layout><button type="button">mock button</button></Layout>);

        userEvent.click(screen.getAllByRole("button")[0]);

        expect(screen.getByAltText("moon indicating dark mode")).toBeInTheDocument();
        expect(screen.queryByAltText("sun indicating light mode")).not.toBeInTheDocument();

        userEvent.click(screen.getAllByRole("button")[0]);

        expect(screen.getByAltText("sun indicating light mode")).toBeInTheDocument();
        expect(screen.queryByAltText("moon indicating dark mode")).not.toBeInTheDocument();
    });

    test("sidebar toggle", () => {
        render(<Layout><button type="button">mock button</button></Layout>);

        userEvent.click(screen.getByTestId("sidebar-toggle"));

        expect(screen.getByTestId("sidebar")).toHaveClass("visible");

        userEvent.click(screen.getByTestId("sidebar-toggle"));

        expect(screen.getByTestId("sidebar")).toHaveClass("invisible");
    });
});
