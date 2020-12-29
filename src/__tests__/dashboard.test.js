import "whatwg-fetch";

import { act, configure, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import * as React from "react";

import PlayingContext from "@/context/PlayingContext";
import Dashboard from "@/pages/dashboard";
import { dashboardSearchbarData, fetchErrorData, fetchSuccessfulData } from "@/testMockData/dashboard";

import { render, rest, server } from "../../test-utils";

Object.defineProperty(window.document, "cookie", {
    value: "jwt=jwt;spaccess=access;sprefresh=refresh",
    writable: true
  });

jest.mock("next/router");

describe("auth user dashboard page", () => {
    let expectedPathname, expectedRouterPrefetch, expectedRouterPush;
    const jsdomPause = window.HTMLMediaElement.prototype.pause;

    beforeAll(() => server.listen());
    afterAll(() => server.close());
    afterEach(() => {
        server.resetHandlers();
        window.HTMLMediaElement.prototype.pause = jsdomPause;
    });
    beforeEach(() => {
      configure({ throwSuggestions: false });
      window.HTMLMediaElement.prototype.pause = jest.fn();
      expectedPathname = "/dashboard";
      expectedRouterPush = jest.fn();
      expectedRouterPrefetch = jest.fn();
      useRouter.mockReturnValue({
          pathname: expectedPathname,
          prefetch: expectedRouterPrefetch,
          push: expectedRouterPush
       });
        rest.get("https://api.spotify.com/v1/browse", (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({}));
        });
        rest.get("https://api.spotify.com/v1/me/top", (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({}));
        });
    });

    test("render <Dashboard /> with errros in fetched data still renders page", () => {
        render(<PlayingContext><Dashboard {...fetchErrorData} /></PlayingContext>);

        expect(screen.getByRole("heading", { name: /dashboard/ui })).toBeInTheDocument();
        expect(screen.getByText(/No spotify account connected/iu)).toBeInTheDocument();
        expect(screen.getByText(/new releases not available/ui)).toBeInTheDocument();
        expect(screen.getByText(/no top tracks/ui)).toBeInTheDocument();
        expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    });

    test("<Dashboard {...props} /> renders with info", () => {
        render(<PlayingContext>
            <Dashboard {...fetchSuccessfulData} />
               </PlayingContext>);

        expect(screen.getByRole("heading", { name: /playlist 1 name/ui })).toBeInTheDocument();
        expect(screen.getByText(/playlist 1 description/ui)).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /artist album 1/ui })).toBeInTheDocument();
        expect(screen.getByText("album 1")).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /artist album 2/ui })).toBeInTheDocument();
        expect(screen.getByText("album 2")).toBeInTheDocument();
    });

    test("<Dashboard {..props} /> searchbar feature", async () => {
        render(<PlayingContext>
            <Dashboard {...fetchSuccessfulData} />
               </PlayingContext>);

        rest.get("https://api.spotify.com/v1/search", (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(dashboardSearchbarData));
        });

        expect(expectedRouterPush).not.toHaveBeenCalled();

        userEvent.type(screen.getByRole("textbox"), "foals");

        expect(screen.getByRole("textbox")).toHaveValue("foals");

        // FireEvent.click(screen.getByTestId("search"));

        // Await waitFor(() => screen.getByText("foals"));

        /*
         * Expect(screen.getByText("foals")).toBeInTheDocument();
         * waitFor(() => expect(screen.findByText(/foals/gui)).toBeInTheDocument());
         */

    });
});
