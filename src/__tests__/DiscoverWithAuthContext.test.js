import "whatwg-fetch";

import { configure, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import * as React from "react";

import PlayingContext from "@/context/PlayingContext";
import Discover from "@/pages/dashboard/discover";
import { fetchSuccessfulData } from "@/testMockData/dashboard";
import { fetchDiscoverData, fetchDiscoverErrorData } from "@/testMockData/discover";

import { render, rest, server } from "../../test-utils";

jest.mock("next/router");

describe("test auth context with <Discover />", () => {
    let expectedRouterPush, expectedPathname;
    const jsdomPause = window.HTMLMediaElement.prototype.pause;

    beforeAll(() => server.listen());
    afterAll(() => server.close());
    afterEach(() => {
        server.resetHandlers();
        window.HTMLMediaElement.prototype.pause = jsdomPause;
    });

    beforeEach(() => {
        expectedRouterPush = jest.fn();
        expectedPathname = "/discover";
        window.HTMLMediaElement.prototype.pause = jest.fn();
        useRouter.mockReturnValue({
            pathname: expectedPathname,
            push: expectedRouterPush
        });
        rest.get("https://api.spotify.com/v1/browse", (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(fetchSuccessfulData.newReleases));
        });
        rest.get("https://api.spotify.com/v1/artists", (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({}));
        });
    });

    test("render <Discover /> with data", () => {
        Object.defineProperty(window.document, "cookie", {
            value: "jwt=jwt;spaccess=access;sprefresh=refresh",
            writable: true
          });

        expect(expectedRouterPush).not.toHaveBeenCalled();

        render(<PlayingContext><Discover {...fetchDiscoverData} /></PlayingContext>);

        expect(screen.queryByText("Unable to find user liked albums")).not.toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /arcade fire/u })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /the vaccines/u })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /bombay bicycle club/u })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /luna bay/u })).toBeInTheDocument();
    });

    test("render <Discover /> with errros in fetched data still renders page", () => {
        render(<PlayingContext><Discover {...fetchDiscoverErrorData} /></PlayingContext>);

        expect(screen.getByText("Unable to find user liked albums")).toBeInTheDocument();
        expect(screen.getByText("no artists")).toBeInTheDocument();
    });

    test("missing jwt calls router push", () => {
        Object.defineProperty(window.document, "cookie", {
            value: "",
            writable: true
          });

        render(<PlayingContext><Discover {...fetchDiscoverErrorData} /></PlayingContext>);

        expect(expectedRouterPush).toHaveBeenCalledTimes(1);
    });

    test("missing spotify tokens on auth page causes router push", () => {
        Object.defineProperty(window.document, "cookie", {
            value: "jwt=jwt",
            writable: true
        });

        render(<PlayingContext><Discover {...fetchDiscoverErrorData} /></PlayingContext>);

        expect(expectedRouterPush).toHaveBeenCalledTimes(1);
    });
});
