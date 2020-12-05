import { parseCookies } from "nookies";
import getConfig from "next/config";
import Image from "next/image";
import useSWR from "swr";

import Layout from "src/containers/Layout/Layout";
import Album from "src/components/Album/Album";
import { fetcher } from "src/hooks/useFetch";
import Playlists from "src/components/Playlists/Playlists";

const { publicRuntimeConfig } = getConfig();

const userSavedAlbumsQuery = `/v1/me/albums?limit=10`;

const myTracks = ({ savedPlaylists, savedAlbums }) => {
    const { data, error } = useSWR(`${publicRuntimeConfig.SPOTIFY_API}${userSavedAlbumsQuery}`, fetcher, {
        initialData: savedAlbums
    });

    if (error) console.error(error);
    if (!data) console.log("loading data");
    
    const { items: albumArr } = data;

    return (
    <Layout>
        <main>
            <section>
                <div className="flex items-center">
                    <p className="capitalize mr-2">
                    tracks from
                    </p>
                    <Image 
                    src="/images/spotify-seeklogo.com.svg"
                    alt="spotify logo"
                    height={70}
                    width={70} />
                </div>
                <h2 className="text-lg uppercase text-txt mt-8 mb-4">
                    my playlist
                </h2>
                 <Playlists spotifyPlaylists={savedPlaylists.items} />
                <h2 className="text-lg uppercase text-txt mt-8 mb-4">
                    my albums
                </h2>
                <ul className="grid gap-x-2 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {albumArr && albumArr.map(album => 
                    <li 
                    className="flex justify-center items-center"
                    key={album.album.id}>
                        <Album
                        name={album.album.name}
                        artist={album.album.artists[0].name}
                        image={album.album.images[0].url}
                        id={album.album.id} />
                    </li>
                    )}
                </ul>
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
            savedAlbums: savedAlbums
        }
    }
}

export default myTracks;