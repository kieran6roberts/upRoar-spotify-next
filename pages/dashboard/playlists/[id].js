import { parseCookies } from "nookies";
import { fetcher } from "src/hooks/useFetch";
import getConfig from "next/config";
import useSWR from "swr";

import Layout from "src/containers/Layout/Layout";
import Track from "src/components/Track/Track";
import Player from "src/components/Player/Player";
import PlayingProvider from "src/context/PlayingContext";

const { publicRuntimeConfig } = getConfig();

const Playlist = ({ queryID, playlistTracks }) => {
    const { data, error } = useSWR(`${publicRuntimeConfig.SPOTIFY_API}${queryID}`, fetcher, {
        initialData: playlistTracks
    });

    if (error) console.error(error);
    if (!data) console.log("loading data");

    console.log(data);
    const { items: tracks } = data;

    return (
        <PlayingProvider>
            <Layout>
                <main>
                    <section>
                        <ul className="grid grid-cols-1 sm:grid-cols-2">
                            {tracks && tracks.map(track => 
                            <li key={track.track.id}>
                            <Track 
                            trackName={track.track.name}
                            trackImage={track.track.album.images[0].url}
                            artist={track.track.artists[0].name}
                            album={track.track.album.name}
                            releaseDate={track.track.album.release_date}
                            spotifyLink={track.track.external_urls.spotify}
                            audioSrc={track.track.preview_url} />
                            </li>)}
                        </ul>
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
    const playlistTracks = await fetcher(`${publicRuntimeConfig.SPOTIFY_API}${playlistQuery}`, {
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