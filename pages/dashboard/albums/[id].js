import { parseCookies } from "nookies";
import { fetcher } from "src/hooks/useFetch";
import getConfig from "next/config";
import Layout from "src/containers/Layout/Layout";
import TrackList from "src/components/TrackList/TrackList";
import Player from "src/components/Player/Player";
import PlayingProvider from "src/context/PlayingContext";

const Albums = ({ album }) => {
    const { tracks: {  items: albumTracks}} = album;
    console.log(album)
    console.log(albumTracks)
    return (
        <PlayingProvider>
            <Layout>
                <main>
                    <section className="md:px-24">
                        <h2 className="text-md text-txt my-8">
                            {album ? album.name : <span>Unable to find album</span>}
                        </h2>
                        <p className="text-sm text-txt mb-4">
                            {album ? album.artists[0].name : null}
                        </p>
                        <p className="text-xs text-txt mb-2 capitalize">
                            {album ? album.album_type : null}
                        </p>
                        <TrackList tracks={albumTracks} image={album} />
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

    const albumQuery = `/v1/albums/${query}`;
    
    const album = await fetcher(`${publicRuntimeConfig.SPOTIFY_API}${albumQuery}`, {       
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        }});
  
    return {
      props: {
        album: album
      }
    }
  }

export default Albums;