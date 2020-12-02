import { parseCookies } from "nookies";
import getConfig from "next/config";
import Image from "next/image";

import Layout from "src/containers/Layout/Layout";
import TrackList from "src/components/TrackList/TrackList";
import Player from "src/components/Player/Player";
import { fetcher } from "src/hooks/useFetch";
import PlayingProvider from "src/context/PlayingContext";

const { publicRuntimeConfig } =  getConfig();

const Dashboard = ({ userInfo, topTracks, newReleases }) => {
  const { items } = topTracks;
  console.log(topTracks);
  console.log(newReleases);
  console.log(userInfo);

  return (
    <PlayingProvider>
      <Layout>
        <main>
          <section>
            <h2 className="mt-8 text-md text-txt">
              dashboard
            </h2>
            <div className="flex items-center text-md text-gray-400 mb-4">
              <Image 
              src="/images/spotify-seeklogo.com.svg"
              alt="spotify logo"
              height={70}
              width={70} />
              <p className="ml-4">
                {userInfo.id}
              </p>
            </div>
            <h3 className="text-md uppercase text-txt mb-8">
              your current top tracks
            </h3>
            <div>
              {items && <TrackList tracks={items} />}
            </div>
            <Player audioSrc={items[0].preview_url}/>
          </section>
        </main>
      </Layout>

    </PlayingProvider>
  )
};

export async function getServerSideProps(ctx) {
    const spAccess = parseCookies(ctx).spaccess;
    const spRefresh = parseCookies(ctx).sprefresh;

    let authToken;

    if (!spAccess) {
      const userPostInfoOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
          grant_type: "refresh_token",
          refresh_token: spRefresh,
          client_id: publicRuntimeConfig.SPOTIFY_CLIENT_ID,
          client_secret: publicRuntimeConfig.SPOTIFY_CLIENT_SECRET
        })
      };

      const userPostRefresh = await fetcher(`${publicRuntimeConfig.SPOTIFY_AUTH_API}/api/token`, userPostInfoOptions);

      authToken = userPostRefresh.access_token;
    }
      else {
        authToken = spAccess;
      }

      const userPostInfo = await fetcher(`${publicRuntimeConfig.SPOTIFY_API}/v1/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      const topTracksQuery = "v1/me/top/tracks?time_range=medium_term&limit=3&offset=5";
      const newReleaseQuery = "/v1/browse/new-releases";

      const [ topTracks, newReleases ] = await Promise.all([
        fetcher(`${publicRuntimeConfig.SPOTIFY_API}/${topTracksQuery}`, {       
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
          }}),
          fetcher(`${publicRuntimeConfig.SPOTIFY_API}${newReleaseQuery}`, {       
            method: "GET",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`
            }})
      ]);

      return {
        props: {
          userInfo: userPostInfo,
          topTracks: topTracks,
          newReleases: newReleases
        }
      }
}

export default Dashboard;