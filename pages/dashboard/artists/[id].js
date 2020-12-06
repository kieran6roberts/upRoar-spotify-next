import { parseCookies } from "nookies";
import getConfig from "next/config";

import { fetcher } from "src/hooks/useFetch";
import Layout from "src/containers/Layout/Layout";

const Artists = ({ artistsAlbums }) => {
    console.log(artistsAlbums);
    return (
        <Layout>
            <main>
                <section>
                    <h2>

                    </h2>
                </section>
            </main>
        </Layout>
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