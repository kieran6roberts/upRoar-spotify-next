import getConfig from "next/config";
import Image from "next/image";
import { parseCookies } from "nookies";
import useSWR from "swr";

import Album from "@/components/Albums/Album/Album";
import PageHead from "@/components/PageHead/PageHead";
import Player from "@/components/Player/Player";
import Playlists from "@/components/Playlists/Playlists";
import Layout from "@/containers/Layout/Layout";
import PlayingProvider from "@/context/PlayingContext";
import { fetcher } from "@/utility/fetcher";

const { publicRuntimeConfig } = getConfig();

const userSavedAlbumsQuery = "/v1/me/albums?limit=10";

function myTracks ({ savedPlaylists, savedAlbums }) {
  const token = parseCookies(null).spaccess;
  const { data, error } = useSWR([
    `${publicRuntimeConfig.SPOTIFY_API}${userSavedAlbumsQuery}`,
    token
  ], fetcher, {
    initialData: savedAlbums
  });

  if (error) {
 console.error(error);
}
  if (!data) {
 console.log("loading data");
}

  const { items: albumArr } = data;

  console.log(albumArr);
  console.log(savedPlaylists);

  return (
    <>
    <PageHead
    currentURL="https://uproar-music.vercel.app/dashboard/my-tracks"
    description="View your favorite tracks with integration from spotify."
    title="upRoar - My tracks"
    />
    <PlayingProvider>
      <Layout>
        <main>
          <section>
            <h2 className="mt-8 mb-4 text-lg uppercase text-txt">
                my playlists
            </h2>
            <Playlists spotifyPlaylists={savedPlaylists ?? []} />
            <h2 className="mt-8 mb-4 text-lg uppercase text-txt">
                my albums
            </h2>
            <div className="flex items-center mb-4">
              <p className="mr-2 capitalize text-txt">
                  tracks from
              </p>
              <Image
              alt="spotify logo"
              height={70}
              src="/images/spotify-seeklogo.com.svg"
              width={70}
              />
            </div>
            <ul className="grid grid-cols-1 gap-x-2 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
              {albumArr && albumArr.map((album) =>
              <li
              className="flex items-center justify-center"
              key={album.album.id}
              >
                  <Album
                  artist={album.album.artists[0].name}
                  id={album.album.id}
                  image={album.album.images[0].url}
                  name={album.album.name}
                  />
              </li>)}
            </ul>
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

  const user = await fetcher(`${process.env.SPOTIFY_API}/v1/me`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    },
    method: "GET"
  });

  const userPlaylistQuery = `/v1/users/${user.id}/playlists?limit=10`;

  const [
    savedPlaylists,
    savedAlbums
  ] = await Promise.all([
    fetcher(`${process.env.SPOTIFY_API}${userPlaylistQuery}`, {
      headers: {
        "Accept": "application/json",
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json"
      },
      method: "GET"
    }),
    fetcher(`${process.env.SPOTIFY_API}${userSavedAlbumsQuery}`, {
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
      savedAlbums,
      savedPlaylists
    }
  };
}

export default myTracks;
