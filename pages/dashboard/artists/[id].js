import { parseCookies } from "nookies";

import Albums from "@/components/Albums/Albums";
import Player from "@/components/Player/Player";
import Layout from "@/containers/Layout/Layout";
import PlayingProvider from "@/context/PlayingContext";
import { fetcher } from "@/hooks/useFetch";

function Artists ({ artistsAlbums }) {
  const { items: artistContentArr } = artistsAlbums;

  return (
    <PlayingProvider>
      <Layout>
        <main>
          <section className="md:px-24">
            <h2 className="my-8 text-md text-txt">
              {artistContentArr[0].artists[0].name}
            </h2>
            <Albums tracks={artistsAlbums} />
            <Player />
          </section>
        </main>
      </Layout>
    </PlayingProvider>
  );
}

export async function getServerSideProps (ctx) {
  const query = ctx.query.id;
  const authToken = parseCookies(ctx).spaccess;

  const artistsAlbums = await fetcher(`${process.env.SPOTIFY_API}/v1/artists/${query}/albums`, {
    headers: {
      "Accept": "application/json",
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json"
    },
    method: "GET"
   });

  return {
    props: {
      artistsAlbums
    }
  };
}

export default Artists;
