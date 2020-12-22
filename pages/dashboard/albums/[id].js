import { parseCookies } from "nookies";

import PageHead from "@/components/PageHead/PageHead";
import Player from "@/components/Player/Player";
import TrackList from "@/components/TrackList/TrackList";
import Layout from "@/containers/Layout/Layout";
import PlayingProvider from "@/context/PlayingContext";
import { fetcher } from "@/utility/fetcher";

function Albums ({ album }) {
  const { tracks: { items: albumTracks } } = album;

  return (
    <>
    <PageHead
    currentURL="https://uproar-music.vercel.app/dashboard/albums/"
    description="upRoar album."
    title="upRoar - Album"
    />
    <PlayingProvider>
      <Layout>
        <main>
          <section className="md:px-24">
            <h2 className="my-8 text-md text-txt">
              {album
              ? album.name
              : <span>Unable to find album</span>}
            </h2>
            <p className="mb-4 uppercase text-md text-txt">
              {album
              ? album.artists[0].name
              : null}
            </p>
            <p className="mb-2 capitalize text-md text-txt">
              {album
              ? album.album_type
              : null}
            </p>
            <TrackList
            image={album}
            tracks={albumTracks}
            />
            <Player />
          </section>
        </main>
      </Layout>
    </PlayingProvider>
    </>
  );
}

export async function getServerSideProps (ctx) {
  const query = ctx.query.id;
  const authToken = parseCookies(ctx).spaccess;

  const albumQuery = `/v1/albums/${query}`;

  const album = await fetcher(`${process.env.SPOTIFY_API}${albumQuery}`, {
    headers: {
      "Accept": "application/json",
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json"
    },
    method: "GET"
   });

  return {
    props: {
      album
    }
  };
}

export default Albums;
