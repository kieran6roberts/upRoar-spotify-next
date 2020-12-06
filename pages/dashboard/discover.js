import React, { useEffect, useState } from "react";
import getConfig from "next/config";
import { parseCookies } from "nookies";
import { fetcher } from "src/hooks/useFetch";

import Layout from "src/containers/Layout/Layout";
import Artist from "src/components/Artist/Artist";
import Albums from "src/components/Albums/Albums";
import Album from "src/components/Album/Album";
import { attributeNames } from "backend/build/1.6d0d7cd2.chunk";

const { publicRuntimeConfig } = getConfig();

const Discover = ({ relatedArtist1, relatedArtist2, userLikedArtists }) => {
  const [ data, setData ] = useState(null);
  console.log(relatedArtist1);
  console.log(relatedArtist2);
  console.log(userLikedArtists)
  console.log(data);
  
  useEffect(() => {
    const fetch = async () => {
      const token = parseCookies(null).spaccess;
      const newReleaseQuery = "/v1/browse/new-releases?offset=0&limit=15";
      const newReleases = await fetcher(`${publicRuntimeConfig.SPOTIFY_API}${newReleaseQuery}`, {       
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
          }
        });
        let newReleasesItems;
        if (!newReleases.error) newReleasesItems = newReleases.albums;
        return setData(newReleasesItems);
    };

    fetch();
  }, []);

  return (
    <Layout>
      <main>
        <section className="md:px-24">
          <h2 className="text-lg uppercase text-txt mt-8 mb-4">
            discover
          </h2>
          <p className="text-md uppercase text-txt mt-8 mb-4">
            the latest and greatest form the world of music
          </p>
          <p className="text-md capitalize text-txt my-8">
            Based on your saved album by {userLikedArtists[0]}
          </p>
          <ul className="grid gap-x-2 gap-y-8 grid-cols-1 sm:grid-cols-2 md:3 lg:grid-cols-5">
            {relatedArtist1.map(artist => 
              <li key={artist.id}>
                <Artist
                id={artist.id}
                name={artist.name}
                image={artist.images[0].url}
                genre={`${artist.genres[0]}/${artist.genres[1]}`}
                followers={artist.followers.total} />
              </li>
              )}
          </ul >
          <p className="text-md capitalize text-txt my-8">
            Based on your saved album by {userLikedArtists[1]}
          </p>
          <ul className="grid gap-x-2 gap-y-8 grid-cols-1 sm:grid-cols-2 md:3 lg:grid-cols-5">
            {relatedArtist2.map(artist => 
              <li key={artist.id}>
                <Artist
                name={artist.name}
                image={artist.images[0].url}
                genre={`${artist.genres[0]}/${artist.genres[1]}`}
                followers={artist.followers.total} />
              </li>
              )}
          </ul>
          <p className="text-lg text-txt my-16">
            Check out the new releases!
          </p>
          {data && <Albums tracks={data} />}
        </section>
      </main>
    </Layout>
  )
};

export async function getServerSideProps(ctx) {
  const authToken = parseCookies(ctx).spaccess;
  const userSavedAlbumsQuery = `/v1/me/albums?limit=5`;

  const userAlbums = await fetcher(`${publicRuntimeConfig.SPOTIFY_API}${userSavedAlbumsQuery}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`
      }
  });

  const userLikedArtists = [ userAlbums.items[0].album.artists[0].id,
   userAlbums.items[1].album.artists[0].id ];

  const userLikedArtistsNames = [ userAlbums.items[0].album.artists[0].name,
   userAlbums.items[1].album.artists[0].name ];

  const [ relatedArtist1, 
    relatedArtist2, 
    relatedArtist3 ] = await Promise.all([
      fetcher(`${publicRuntimeConfig.SPOTIFY_API}/v1/artists/${userLikedArtists[0]}/related-artists?limit=5`, {       
            method: "GET",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`
            }
          }),
      fetcher(`${publicRuntimeConfig.SPOTIFY_API}/v1/artists/${userLikedArtists[1]}/related-artists?limit=5`, {       
            method: "GET",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`
            }
          })
    ]);
  
  

  return {
    props: {
      relatedArtist1: relatedArtist1.artists,
      relatedArtist2: relatedArtist2.artists,
      userLikedArtists: userLikedArtistsNames
    }
  }
}

export default Discover;