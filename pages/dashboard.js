import { parseCookies } from "nookies";
import fetch from "isomorphic-fetch";
import getConfig from "next/config";
import Image from "next/image";

import Layout from "src/containers/Layout/Layout";
import TrackList from "src/components/TrackList/TrackList";
import { fetcher } from "src/hooks/useFetch";

const { publicRuntimeConfig } =  getConfig();

const Dashboard = ({ user, topTracks }) => {
  const { items } = topTracks;

  return (
    <Layout>
      <main>
        <section>
          <h2 className="mt-8 text-md">
            dashboard
          </h2>
          <div className="flex items-center text-md text-gray-400 mb-4">
            <Image 
            src="/images/spotify-seeklogo.com.svg"
            alt="spotify logo"
            height={70}
            width={70} />
            <p className="ml-4">
              {user.id}
            </p>
          </div>
          <h3 className="text-md uppercase text-pri mb-8">
            your current top tracks
          </h3>
          <div>
            {items && <TrackList tracks={items} />}
          </div>
        </section>
      </main>
    </Layout>
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

      const query = "v1/me/top/tracks?time_range=medium_term&limit=10&offset=5";

      const topTracksPostInfo = await fetcher(`${publicRuntimeConfig.SPOTIFY_API}/${query}`, {       
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      }});
      
      return {
        props: {
          user: userPostInfo,
          topTracks: topTracksPostInfo
        }
      }
}

export default Dashboard;