import { useCallback } from "react";
import { parseCookies, setCookie } from "nookies";
import getConfig from "next/config";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import { MdClear } from "react-icons/md";
import { useState } from "react";

import Layout from "src/containers/Layout/Layout";
import TrackList from "src/components/TrackList/TrackList";
import Albums from "src/components/Albums/Albums";
import Player from "src/components/Player/Player";
import { fetcher } from "src/hooks/useFetch";
import PlayingProvider from "src/context/PlayingContext";
import userSearchValidation from "src/validation/userSearch";
import useForm from "src/hooks/useForm";
import Playlists from "src/components/Playlists/Playlists";

const { publicRuntimeConfig } =  getConfig();

const Dashboard = ({ userInfo, topTracks, newReleases, token, featuredPlaylists }) => {
  let topTracksItems;
  let newReleasesItems;
  
  if (!topTracks.error) topTracksItems = topTracks.items;
  if (!newReleases.error) newReleasesItems = newReleases.albums.items;
  
  console.log(topTracksItems);
  const [ results, setResults ] = useState([]);

  const formatQuery = useCallback( () => {
    const { search } = inputValues;
    return search.trim().replaceAll(" ", "%20");
  });

  const resetResultsHandler = useCallback( () => {
    setInputValues({ search: "" });
    setResults([]);
  });

  const fetchQuery = useCallback( async () => {
    const type = "type=track,album";
    const encodedQuery = formatQuery();
    if (encodedQuery === "" || typeof(encodedQuery) !== "string") {
      return alert("Search for something!");
    }
    if (!token) return null;

    const data = await fetcher(`${publicRuntimeConfig.SPOTIFY_API}/v1/search?q=${encodedQuery}&${type}&limit=5&offset=0`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }});
    setResults(data);
  });

  const {
    inputValues, 
    errors, 
    submitting, 
    inputChangeHandler, 
    submitHandler,
    setInputValues
  } = useForm({ stateInit: { search: "" }, validate: userSearchValidation, submitFunc: fetchQuery });

  return (
    <PlayingProvider>
      <Layout>
        <main>
          <section className="md:px-24">
            <div className="mt-4">
              <div className="w-full border-b-2">
                <button 
                className="py-4 px-4 text-txt mr-2"
                onClick={submitHandler}
                onKeyPress={event => console.log(event)}>
                  <BsSearch />
                </button>
                <button 
                className={`py-2 px-2 bg-sec text-txt ${inputValues.search ? "visible pointer-events-auto" : "invisible pointer-events-none"}`}
                onClick={resetResultsHandler}>
                <MdClear />
                </button>
                <input 
                id="search"
                name="search"
                type="text"
                placeholder="search for tracks or albums..."
                value={inputValues.search}
                className="w-4/6 md:w-5/6 mr-auto py-2 px-4 bg-pri text-txt focus:outline-none"
                onChange={inputChangeHandler}
                onKeyPress={event => event.code === "Enter" ? fetchQuery() : null} />
                <div className={`h-0 transition-all duration-200 ease-in-out
                ${results.length !== 0 && inputValues.search && "h-auto p-8 border-t-2"}`}>
                  <p className={`${results.length !== 0 ? "block" : "hidden" } text-md my-2`}>
                    albums
                  </p>
                  {
                  results.length !== 0 && inputValues.search &&
                  <>
                  <Albums albums={results.albums.items} />
                  <p className={`${results.length !== 0 && inputValues.search 
                    ? "block" : "hidden" } text-md my-2`}>
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
            <h2 className="text-sm text-right text-txt ml-auto mt-4">
                dashboard
              </h2>
            <div className="flex items-center justify-end text-md text-gray-400 ml-auto mb-4">
              <Image 
              src="/images/spotify-seeklogo.com.svg"
              alt="spotify logo"
              height={70}
              width={70} />
              {!userInfo.error || !userInfo.error.status == 401 ?
              <p className="text-sm text-txt ml-4">
                {userInfo.id}
              </p>
              :
              <p className="text-sm text-txt ml-4">
                No spotify account connected
              </p>
              }
            </div>
            <h3 className="text-lg uppercase text-txt my-16">
              Discover new releases 
            </h3>
            {!newReleases.error || !newReleases.error.status == 401 
            ?
            <Albums albums={newReleasesItems} />
              :
              <span className="text-sm text-txt capitalize">
              new releases not available
            </span>
            }
            <h3 className="text-sm text-lg uppercase uppercase text-txt my-16">
              your current top tracks
            </h3>
            <div>
              {!topTracks.error || !topTracks.error.status == 401 
              ?
              <TrackList tracks={topTracksItems} />
              :
              <span className="text-sm text-txt capitalize">
                no top tracks
              </span>
              }
            </div>
            <h3 className="text-sm text-lg uppercase uppercase text-txt my-16">
              featured playlists
            </h3>
            <Playlists spotifyPlaylists={featuredPlaylists}/>
            <Player />
          </section>
        </main>
      </Layout>
    </PlayingProvider>
  )
};

export async function getServerSideProps(ctx) {
    const spAccess = parseCookies(ctx).spaccess;
    const spRefresh = parseCookies(ctx).sprefresh;

    let authToken;

    if (!spAccess) {
      const queryString = require("query-string");
      const userPostRefresh = await fetcher(`${process.env.SPOTIFY_AUTH_API}/api/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${process.env.SPOTIFY_ENCODED}`
        },
        body: queryString.stringify({
          grant_type: "refresh_token",
          refresh_token: spRefresh,
          client_id: process.env.SPOTIFY_CLIENT_ID,
          client_secret: process.env.SPOTIFY_CLIENT_SECRET,
        })
      });

      if (userPostRefresh.access_token) {
        authToken = userPostRefresh.access_token;

        setCookie(ctx, "spaccess", userPostRefresh.access_token, {
          maxAge: 3600,
          path: '/'
        });
      }
    }
      else {
        authToken = spAccess;
      }

      const userPostInfo = await fetcher(`${process.env.SPOTIFY_API}/v1/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      const topTracksQuery = "/v1/me/top/tracks?time_range=medium_term&limit=8&offset=0";
      const newReleaseQuery = "/v1/browse/new-releases?offset=0&limit=6";
      const featuredPlaylistQuery = "/v1/browse/featured-playlists?offset=0&limit=3";

      const [ topTracks, newReleases, featuredPlaylists ] = await Promise.all([
        fetcher(`${process.env.SPOTIFY_API}${topTracksQuery}`, {       
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
          }}),
          fetcher(`${process.env.SPOTIFY_API}${newReleaseQuery}`, {       
            method: "GET",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`
            }}),
          fetcher(`${process.env.SPOTIFY_API}${featuredPlaylistQuery}`, {       
            method: "GET",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`
            }})
      ]);

      return {
        props: {
          userInfo: userPostInfo,
          topTracks: topTracks,
          newReleases: newReleases,
          featuredPlaylists: featuredPlaylists,
          token: authToken || null,
        }
      }
}

export default Dashboard;