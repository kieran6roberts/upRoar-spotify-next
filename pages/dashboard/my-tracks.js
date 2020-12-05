import { parseCookies } from "nookies";
import getConfig from "next/config";
import useSWR from "swr";

import Layout from "src/containers/Layout/Layout";
import Albums from "src/components/Albums/Albums";
import { fetcher } from "src/hooks/useFetch";


const { publicRuntimeConfig } = getConfig();

const userSavedAlbumsQuery = `/v1/me/albums?limit=10`;

const myTracks = ({ savedPlaylists, userSavedAlbumsQuery }) => {
    const { data, error } = useSWR(`${publicRuntimeConfig.SPOTIFY_API}${userSavedAlbumsQuery}`, fetcher, {
        initialData: userSavedAlbumsQuery
    });

    if (error) console.error(error);
    if (!data) console.log("loading data");

    console.log(data);
    console.log(savedPlaylists);

    return (
    <Layout>
        <main>
            <section>
                <h2 className="text-lg uppercase text-txt mt-8 mb-4">
                    my tracks
                </h2>
               
            </section>
        </main>
    </Layout>
    )
};

export async function getServerSideProps(ctx) {
    const authToken = parseCookies(ctx).spaccess;

    const user = await fetcher(`${publicRuntimeConfig.SPOTIFY_API}/v1/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });

    const userPlaylistQuery = `/v1/users/${user.id}/playlists?limit=10`;
    
    const [ savedPlaylists, savedAlbums ] = await Promise.all([
        fetcher(`${publicRuntimeConfig.SPOTIFY_API}${userPlaylistQuery}`, {
            method: "GET",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`
            }
        }),
        fetcher(`${publicRuntimeConfig.SPOTIFY_API}${userSavedAlbumsQuery}`, {
            method: "GET",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`
            }
        }),
    ]);

    return {
        props: {
            savedPlaylists: savedPlaylists,
            userSavedAlbumsQuery: savedAlbums
        }
    }
}

export default myTracks;