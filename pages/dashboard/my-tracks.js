import Layout from "src/containers/Layout/Layout";
import { parseCookies } from "nookies";
import getConfig from "next/config";
import useSWR from "swr";
import { fetcher } from "src/hooks/useFetch";

const { publicRuntimeConfig } = getConfig();

const myTracks = ({ savedPlaylists }) => {
    const { data, error } = useSWR(`${publicRuntimeConfig.SPOTIFY_API}`, fetcher, { 
        initialData: savedPlaylists
    });


    <Layout>
        <main>
            <section>
                <h2 className="text-lg uppercase text-txt mt-8 mb-4">
                    my tracks
                </h2>
            </section>
        </main>
    </Layout>
};

export async function getServerSideProps(ctx) {
    const authToken = parseCookies(ctx).spaccess;

    const [ savedPlaylists ] = Promise.all([
        await fetcher(`${publicRuntimeConfig.SPOTIFY_API}`)
    ]);

    return {
        props: {
            savedPlaylists: savedPlaylists
        }
    }
}

export default myTracks;