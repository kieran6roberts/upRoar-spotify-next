import { configure, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import Player from "@/components/Player/Player";
import TrackList from "@/components/TrackList/TrackList";
import PlayingProvider from "@/context/PlayingContext";
import { fetchSuccessfulData } from "@/testMockData/dashboard";

describe("<Player /> with playing context", () => {
    const jsdomPause = window.HTMLMediaElement.prototype.pause;
    const jsdomPlay = window.HTMLMediaElement.prototype.play;
    const jsdomLoad = window.HTMLMediaElement.prototype.load;

    beforeEach(() => {
        configure({ throwSuggestions: false });
        window.HTMLMediaElement.prototype.pause = jest.fn();
        window.HTMLMediaElement.prototype.play = jest.fn();
        window.HTMLMediaElement.prototype.load = jest.fn();
    });
    afterEach(() => {
        window.HTMLMediaElement.prototype.pause = jsdomPause;
        window.HTMLMediaElement.prototype.play = jsdomPlay;
        window.HTMLMediaElement.prototype.load = jsdomLoad;
    });
    test("renders", () => {
        const { topTracks: { items: tracks } } = fetchSuccessfulData;

        render(<PlayingProvider>
            <TrackList tracks={tracks} />
            <Player />
               </PlayingProvider>);

        expect(screen.getByTestId("player-container")).toBeInTheDocument();
        expect(screen.getAllByAltText(/album cover/ui)[0]).toBeInTheDocument();
        expect(screen.getAllByAltText(/album cover/ui)[1]).toBeInTheDocument();
        expect(screen.getByText(/no track/ui)).toBeInTheDocument();
        expect(screen.getByText(/no artist/ui)).toBeInTheDocument();
    });

    test("<Player /> opens on play, and track btn play pause", async () => {
        const { topTracks: { items: tracks } } = fetchSuccessfulData;

        render(<PlayingProvider>
            <TrackList tracks={tracks} />
            <Player />
               </PlayingProvider>);

        const [trackPlayBtn] = screen.getAllByRole("button");

        expect(screen.getByTestId("player-container")).toHaveClass("h-0");

        userEvent.click(trackPlayBtn);

        expect(screen.getByTestId("player-container")).toHaveClass("h-32");

        expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);

        userEvent.click(trackPlayBtn);

        expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalledTimes(2);
        expect(screen.queryByText(/no track/ui)).not.toBeInTheDocument();
        expect(screen.queryByText(/no artist/ui)).not.toBeInTheDocument();
    });

    test("<Player /> controls and audio src", () => {
        const { topTracks: { items: tracks } } = fetchSuccessfulData;

        render(<PlayingProvider>
            <TrackList tracks={tracks} />
            <Player />
               </PlayingProvider>);

        const [
trackPlayBtn, , , playerPrev,
playerPlay,
playerNext
] = screen.getAllByRole("button");

        userEvent.click(trackPlayBtn);

        expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
        expect(window.HTMLMediaElement.prototype.load).toHaveBeenCalledTimes(1);
        expect(screen.getByTestId("player-track")).toHaveTextContent("top track 1 name");
        expect(screen.getByTestId("player-src")).toHaveAttribute("src", "https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg");

        userEvent.click(playerPlay);

        expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalledTimes(3);

        userEvent.click(playerNext);

        expect(window.HTMLMediaElement.prototype.load).toHaveBeenCalledTimes(2);
        expect(screen.getByTestId("player-track")).toHaveTextContent("top track 2 name");
        expect(screen.getByTestId("player-src")).toHaveAttribute("src", "https://actions.google.com/sounds/v1/ambiences/arcade_room.ogg");

        userEvent.click(playerNext);

        expect(screen.getByTestId("player-src")).toHaveAttribute("src", "https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg");
        expect(screen.getByTestId("player-track")).toHaveTextContent("top track 1 name");
        userEvent.click(playerPrev);

        expect(screen.getByTestId("player-src")).toHaveAttribute("src", "https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg");
        expect(screen.getByTestId("player-track")).toHaveTextContent("top track 1 name");

        userEvent.click(playerNext);

        expect(screen.getByTestId("player-track")).toHaveTextContent("top track 2 name");

        userEvent.click(playerPrev);

        expect(screen.getByTestId("player-track")).toHaveTextContent("top track 1 name");
    });
});
