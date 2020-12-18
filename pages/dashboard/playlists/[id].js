import { useCallback } from "react";
import { parseCookies } from "nookies";
import { fetcher } from "src/hooks/useFetch";
import getConfig from "next/config";
import useSWR from "swr";

import Layout from "src/containers/Layout/Layout";
import Track from "src/components/Track/Track";
import TrackList from "src/components/TrackList/TrackList";
import Player from "src/components/Player/Player";
import PlayingProvider from "src/context/PlayingContext";

const { publicRuntimeConfig } = getConfig();

const Playlist = ({ queryID, playlistTracks }) => {
    const { data, error } = useSWR(`${publicRuntimeConfig.SPOTIFY_API}${queryID}`, fetcher, {
        initialData: playlistTracks
    });
    if (error) console.error(error);
    if (!data) console.log("loading data");
    const { items: tracks } = data;

    const formatTracks = useCallback( () => tracks.map(track => track.track));
    console.log(formatTracks())
    
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
    )
};

export async function getServerSideProps(ctx) {
    const { query: { id: queryID } } = ctx;
    const token = parseCookies(ctx).spaccess;

    const playlistQuery = `/v1/playlists/${queryID}/tracks?limit=20&offset=0`;
    const playlistTracks = await fetcher(`${process.env.SPOTIFY_API}${playlistQuery}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
    });

    return {
        props: {
            playlistTracks: playlistTracks,
            queryID: queryID
        }
    }

}

export default Playlist;