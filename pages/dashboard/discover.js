import getConfig from "next/config";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";

import Albums from "@/components/Albums/Albums";
import Artist from "@/components/Artist/Artist";
import PageHead from "@/components/PageHead/PageHead";
import Player from "@/components/Player/Player";
import Layout from "@/containers/Layout/Layout";
import PlayingProvider from "@/context/PlayingContext";
import { fetcher } from "@/utility/fetcher";

const { publicRuntimeConfig } = getConfig();

function Discover ({ relatedArtist1, relatedArtist2, userLikedArtists }) {
  const [
    data,
    setData
  ] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetch () {
      const token = parseCookies(null).spaccess;
      const newReleaseQuery = "/v1/browse/new-releases?offset=0&limit=15";

      try {
        const newReleases = await fetcher(`${publicRuntimeConfig.SPOTIFY_API}${newReleaseQuery}`, {
          headers: {
            "Accept": "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          method: "GET",
          signal: controller.signal
        });
        let newReleasesItems;

        if (!newReleases.error) {
          newReleasesItems = newReleases.albums;
        }
        setData(newReleasesItems);

      } catch (error) {
          if (controller.signal.aborted) {
            console.error(error);
          }
      }
    }

    fetch();

    return function cleanup () {
       controller.abort();
    };
  }, []);

  return (
    <>
    <PageHead
    currentURL="https://uproar-music.vercel.app/dashboard/discover"
    description="upRoar discover where we recommend you artists based on your
    existing likes. Let's discover together."
    title="upRoar - Discover"
    />
    <PlayingProvider>
      <Layout>
        <main>
          <section className="md:px-24">
            <h2 className="mt-4 ml-auto text-sm text-right text-txt">
                discover
            </h2>
            <p className="mt-8 mb-4 uppercase text-md text-txt">
                the latest and greatest form the world of music
            </p>
            {userLikedArtists ?
            <p className="my-12 text-sm text-pink-300 uppercase">
              Based on your saved album by {userLikedArtists[0]}
            </p>
            :
            <p className="my-12 text-sm text-pink-300 uppercase">
                Unable to find user liked albums
            </p>
            }
            <ul className="grid grid-cols-1 gap-x-2 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {relatedArtist1
              ? relatedArtist1.map((artist) =>
              <li key={artist.id}>
                  <Artist
                  followers={artist.followers.total}
                  genre={`${artist.genres[0]}/${artist.genres[1]}`}
                  id={artist.id}
                  image={artist.images[0].url}
                  name={artist.name}
                  />
              </li>)
              : <p className="text-sm uppercase text-txt">no artists</p>}
            </ul >
            {userLikedArtists ?
            <p className="my-20 text-sm text-pink-300 uppercase">
              Based on your saved album by {userLikedArtists[1]}
            </p>
            :
            null
            }
            <ul className="grid grid-cols-1 gap-x-2 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {relatedArtist2
              ? relatedArtist2.map((artist) =>
                <li key={artist.id}>
                  <Artist
                  followers={artist.followers.total}
                  genre={`${artist.genres[0]}/${artist.genres[1]}`}
                  image={artist.images[0].url}
                  name={artist.name}
                  />
                </li>)
                : null}
            </ul>
            {data ?
            <p className="my-16 text-lg text-txt">
                Check out the new releases!
            </p>
            : null
            }
            {data ?
             <Albums tracks={data} />
            :
            null}
            <Player />
          </section>
        </main>
      </Layout>
    </PlayingProvider>
    </>
  );
}

export async function getServerSideProps (ctx) {
  const authToken = parseCookies(ctx).spaccess;
  const userSavedAlbumsQuery = "/v1/me/albums?limit=5";

  const userAlbums = await fetcher(`${process.env.SPOTIFY_API}${userSavedAlbumsQuery}`, {
    headers: {
      "Accept": "application/json",
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json"
    },
    method: "GET"
  });

  if (!userAlbums.items) {
    return {
      props: {}
    };
  }

  const userLikedArtists = [
    userAlbums.items[0].album.artists[0].id,
    userAlbums.items[1].album.artists[0].id
  ];

  const userLikedArtistsNames = [
    userAlbums.items[0].album.artists[0].name,
    userAlbums.items[1].album.artists[0].name
  ];

  const [
    relatedArtist1,
    relatedArtist2
  ] = await Promise.all([
    fetcher(`${process.env.SPOTIFY_API}/v1/artists/${userLikedArtists[0]}/related-artists?limit=5`, {
      headers: {
        "Accept": "application/json",
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json"
      },
      method: "GET"
    }),
    fetcher(`${process.env.SPOTIFY_API}/v1/artists/${userLikedArtists[1]}/related-artists?limit=5`, {
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
      relatedArtist1: relatedArtist1.artists,
      relatedArtist2: relatedArtist2.artists,
      userLikedArtists: userLikedArtistsNames
    }
  };
}

export default Discover;
