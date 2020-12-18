import { parseCookies } from "nookies";
import getConfig from "next/config";

import { fetcher } from "src/hooks/useFetch";
import Layout from "src/containers/Layout/Layout";
import Albums from "src/components/Albums/Albums";
import Player from "src/components/Player/Player";
import PlayingProvider from "src/context/PlayingContext";

const Artists = ({ artistsAlbums }) => {
    const { items: artistContentArr } = artistsAlbums;
    return (
        <PlayingProvider>
            <Layout>
                <main>
                    <section className="md:px-24">
                        <h2 className="text-md text-txt my-8">
                            {artistContentArr[0].artists[0].name}
                        </h2>
                        <Albums tracks={artistsAlbums} />
                        <Player />
                    </section>
                </main>
            </Layout>
        </PlayingProvider>
    )
};

export async function getServerSideProps(ctx) {
    const { publicRuntimeConfig } = getConfig();

    const query = ctx.query.id
    const authToken = parseCookies(ctx).spaccess;

    const artistsAlbums = await fetcher(`${publicRuntimeConfig.SPOTIFY_API}/v1/artists/${query}/albums`, {       
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        }});
    return {
        props: {
            artistsAlbums: artistsAlbums
        }
    }
}

export default Artists;