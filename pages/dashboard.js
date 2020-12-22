import getConfig from "next/config";
import Image from "next/image";
import { parseCookies, setCookie } from "nookies";
import { useCallback, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MdClear } from "react-icons/md";

import Albums from "@/components/Albums/Albums";
import PageHead from "@/components/PageHead/PageHead";
import Player from "@/components/Player/Player";
import Playlists from "@/components/Playlists/Playlists";
import TrackList from "@/components/TrackList/TrackList";
import Layout from "@/containers/Layout/Layout";
import PlayingProvider from "@/context/PlayingContext";
import useForm from "@/hooks/useForm";
import { fetcher } from "@/utility/fetcher";
import userSearchValidation from "@/validation/userSearch";

const { publicRuntimeConfig } = getConfig();

function Dashboard ({ userInfo, topTracks, newReleases, token, featuredPlaylists }) {
  let topTracksItems;
  let newReleasesItems;

  if (!topTracks.error) {
    topTracksItems = topTracks.items;
  }
  if (!newReleases.error) {
    newReleasesItems = newReleases.albums.items;
  }


  const fetchQuery = useCallback(async () => {
    const type = "type=track,album";
    const encodedQuery = formatQuery();

    if (encodedQuery === "" || typeof encodedQuery !== "string") {
      return alert("Search for something!");
    }
    if (!token) {
      return null;
    }

    const data = await fetcher(`${publicRuntimeConfig.SPOTIFY_API}/v1/search?q=${encodedQuery}&${type}&limit=5&offset=0`, {
      headers: {
        "Accept": "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      method: "GET"
     });

    setResults(data);

    return null;
  });

  const {
    inputValues,
    inputChangeHandler,
    submitHandler,
    setInputValues
  } = useForm({ stateInit: { search: "" },
    validate: userSearchValidation,
    submitFunc: fetchQuery });

  const [
    results,
    setResults
  ] = useState([]);

  const formatQuery = useCallback(() => {
    const { search } = inputValues;

    return search.trim().replaceAll(" ", "%20");
  });

  const resetResultsHandler = useCallback(() => {
    setInputValues({ search: "" });
    setResults([]);
  });

  return (
    <>
    <PageHead
    currentURL="https://uproar-music.vercel.app/dashboard"
    description="upRoar's dashboard is the place to start your music adventure.
    Play your favorite songs, search for new albums, tracks and playlist or
    let us show you what's new."
    title="upRoar - Dashboard"
    />
    <PlayingProvider>
      <Layout>
        <main>
          <section className="lg:px-16">
            <div className="mt-4">
              <div className="w-full m-auto border-b-2">
                <button
                className="px-2 py-4 mr-2 md:px-4 text-txt"
                onClick={submitHandler}
                type="submit"
                >
                  <BsSearch />
                </button>
                <button
                className={`py-2 px-1 md:px-2 bg-sec text-txt 
                  ${inputValues.search
                  ? "visible pointer-events-auto"
                  : "invisible pointer-events-none"}`}
                onClick={resetResultsHandler}
                type="reset"
                >
                  <MdClear />
                </button>
                <input
                className="w-4/6 px-2 py-2 mr-auto text-xs md:px-4 md:w-5/6 bg-pri text-txt focus:outline-none focus:ring-3 focus:ring-pri"
                id="search"
                name="search"
                onChange={inputChangeHandler}
                onKeyPress={(event) => event.code === "Enter"
                ? fetchQuery()
                : null}
                placeholder="search for tracks or albums..."
                type="text"
                value={inputValues.search}
                />
                <div className={`h-0 transition-all duration-200 ease-in-out
                ${results.length !== 0 && inputValues.search && "h-auto p-8 border-t-2"}`}
                >
                  <p className={`${results.length === 0
                    ? "hidden"
                    : "block"} text-md my-2`}
                  >
                   albums
                  </p>
                  {
                    results.length !== 0 && inputValues.search &&
                    <>
                      <Albums albums={results.albums.items} />
                      <p className={`${results.length !== 0 && inputValues.search
                        ? "block"
                        : "hidden"} text-md my-2`}
                      >
                       tracks
                      </p>
                      <TrackList tracks={results.tracks.items} />
                    </>
                  }
                  {
                    results.length !== 0 && !inputValues.search && resetResultsHandler()
                  }
                </div>
              </div>
            </div>
            <h2 className="mt-4 ml-auto text-sm text-right text-txt">
             dashboard
            </h2>
            <div className="flex items-center justify-end mb-4 ml-auto text-gray-400 text-md">
              <Image
              alt="spotify logo"
              height={70}
              src="/images/spotify-seeklogo.com.svg"
              width={70}
              />
              {!userInfo.error || !userInfo.error.status === 401
                ? <p className="ml-4 text-sm text-txt">
                  {userInfo.id}
                  </p>
                : <p className="ml-4 text-sm text-txt">
                  No spotify account connected
                  </p>}
            </div>
            <h3 className="my-16 uppercase 2xl:my-32 text-md text-txt">
             Discover new releases
            </h3>
            {!newReleases.error || !newReleases.error.status === 401
              ? <Albums albums={newReleasesItems} />
              : <span className="text-sm uppercase text-txt">
                  new releases not available
                </span>}
            <h3 className="my-16 uppercase 2xl:my-32 text-md text-txt">
             your current top tracks
            </h3>
            <div>
              {!topTracks.error || !topTracks.error.status === 401
                ? <TrackList tracks={topTracksItems} />
                : <span className="text-sm uppercase text-txt">
                    no top tracks
                  </span>}
            </div>
            <h3 className="my-16 uppercase 2xl:my-32 text-md text-txt">
             featured playlists
            </h3>
            {featuredPlaylists &&
            <Playlists spotifyPlaylists={featuredPlaylists} />}
            <Player />
          </section>
        </main>
      </Layout>
    </PlayingProvider>
    </>
  );
}

export async function getServerSideProps (ctx) {
  const spAccess = parseCookies(ctx).spaccess;
  const spRefresh = parseCookies(ctx).sprefresh;

  let authToken;

  if (!spAccess) {
    const queryString = require("query-string");
    const userPostRefresh = await fetcher(`${process.env.SPOTIFY_AUTH_API}/api/token`, {
      body: queryString.stringify({
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: spRefresh
      }),
      headers: {
        Authorization: `Basic ${process.env.SPOTIFY_ENCODED}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    });

    if (userPostRefresh.access_token) {
      authToken = userPostRefresh.access_token;

      setCookie(ctx, "spaccess", userPostRefresh.access_token, {
        maxAge: 3600,
        path: "/"
      });
    }
  } else {
    authToken = spAccess;
  }

  const userPostInfo = await fetcher(`${process.env.SPOTIFY_API}/v1/me`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    },
    method: "GET"
  });

  const topTracksQuery = "/v1/me/top/tracks?time_range=medium_term&limit=8&offset=0";
  const newReleaseQuery = "/v1/browse/new-releases?offset=0&limit=6";
  const featuredPlaylistQuery = "/v1/browse/featured-playlists?offset=0&limit=3";

  const [
    topTracks,
    newReleases,
    featuredPlaylists
  ] = await Promise.all([
    fetcher(`${process.env.SPOTIFY_API}${topTracksQuery}`, {
      headers: {
        "Accept": "application/json",
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json"
      },
      method: "GET"
    }),
    fetcher(`${process.env.SPOTIFY_API}${newReleaseQuery}`, {
      headers: {
        "Accept": "application/json",
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json"
      },
      method: "GET"
     }),
    fetcher(`${process.env.SPOTIFY_API}${featuredPlaylistQuery}`, {
      headers: {
        "Accept": "application/json",
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json"
      },
      method: "GET"
     })
  ]);

  return {
    props: {
      featuredPlaylists,
      newReleases,
      token: authToken ?? null,
      topTracks,
      userInfo: userPostInfo
    }
  };
}

export default Dashboard;
