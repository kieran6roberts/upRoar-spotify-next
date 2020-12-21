import getConfig from "next/config";
import { parseCookies } from "nookies";
import { useCallback } from "react";
import useSWR from "swr";

import Player from "@/components/Player/Player";
import TrackList from "@/components/TrackList/TrackList";
import Layout from "@/containers/Layout/Layout";
import PlayingProvider from "@/context/PlayingContext";
import { fetcher } from "@/hooks/useFetch";

const { publicRuntimeConfig } = getConfig();

function Playlist ({ queryID, playlistTracks }) {
  const { data, error } = useSWR(`${publicRuntimeConfig.SPOTIFY_API}${queryID}`, fetcher, {
    initialData: playlistTracks
  });

  if (error) {
 console.error(error);
}
  if (!data) {
 console.log("loading data");
}

  const { items: tracks } = data;

  const formatTracks = useCallback(() => tracks.map((track) => track.track));

  return (
    <PlayingProvider>
      <Layout>
        <main>
          <section>
            {tracks && <TrackList tracks={formatTracks()} />}
            <Player />
          </section>
        </main>
      </Layout>
    </PlayingProvider>
  );
}

export async function getServerSideProps (ctx) {
  const { query: { id: queryID } } = ctx;
  const token = parseCookies(ctx).spaccess;

  const playlistQuery = `/v1/playlists/${queryID}/tracks?limit=20&offset=0`;
  const playlistTracks = await fetcher(`${process.env.SPOTIFY_API}${playlistQuery}`, {
    headers: {
      "Accept": "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    method: "GET"
  });

  return {
    props: {
      playlistTracks,
      queryID
    }
  };

}

export default Playlist;
