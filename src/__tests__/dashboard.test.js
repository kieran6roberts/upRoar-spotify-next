import "whatwg-fetch";

import { screen } from "@testing-library/react";
import { useRouter } from "next/router";
import * as React from "react";

import PlayingContext from "@/context/PlayingContext";
import Dashboard from "@/pages/dashboard";

import { render, rest, server } from "../../test-utils";

jest.mock("next/router");
const pauseStub = jest.spyOn(window.HTMLAudioElement.prototype, "pause")
    .mockImplementation(() => {});
const playerStub = jest.spyOn(window.HTMLAudioElement.prototype, "play")
    .mockImplementation(() => Promise.resolve("play"));

describe("auth user dashboard page", () => {
    let expectedPathname, expectedRouterPush;

    const data = {
        featuredPlaylists: { error: "error" },
        newReleases: { error: "error" },
        token: { error: "error" },
        topTracks: { error: "error" },
        userInfo: { error: "error" }
    };

    beforeAll(() => server.listen());
    afterAll(() => server.close());
    afterEach(() => {
        server.resetHandlers();
        pauseStub.mockRestore();
        playerStub.mockRestore();
    });
    beforeEach(() => {
      expectedRouterPush = jest.fn();
      expectedPathname = "/dashboard";
      useRouter.mockReturnValue({
          pathname: expectedPathname,
          push: expectedRouterPush
       });
    });

    test("render dashboard with music player context", () => {
        rest.get("https://api.spotify.com/v1/browse", (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({}));
        });
        rest.get("https://api.spotify.com/v1/me/top", (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({}));
        });
        render(<PlayingContext><Dashboard {...data} /></PlayingContext>);

        expect(screen.getByText("dashboard")).toBeInTheDocument();
    });
});
