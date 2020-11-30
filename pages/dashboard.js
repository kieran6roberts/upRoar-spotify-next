import { parseCookies } from "nookies";
import fetch from "isomorphic-fetch";
import getConfig from "next/config";
import Image from "next/image";
import Layout from "src/containers/Layout/Layout";
import TrackList from "src/components/TrackList/TrackList";

const { publicRuntimeConfig } =  getConfig();

const Dashboard = ({ user, topTracks }) => {
  console.log(user);
  console.log(topTracks.items);
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
          <TrackList tracks={items} />
          </div>
        </section>
      </main>
    </Layout>
  )
};

export async function getServerSideProps(ctx) {
    const spAccess = parseCookies(ctx).spaccess;
    const spRefresh = parseCookies(ctx).sprefresh;

    if (!spAccess) {
      const refreshBody = {
        grant_type: "refresh_token",
        refresh_token: spRefresh,
        client_id: publicRuntimeConfig.SPOTIFY_CLIENT_ID,
        client_secret: publicRuntimeConfig.SPOTIFY_CLIENT_SECRET
      };

      const refreshResponse = await fetch(`${publicRuntimeConfig.SPOTIFY_AUTH_API}/api/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(refreshBody)
      })
  
      const refreshData = await refreshResponse.json();

      const userResponse = await fetch(`${publicRuntimeConfig.SPOTIFY_API}/v1/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${refreshData.access_token}`
        }
      });
  
      const userData = await userResponse.json();

      const topTracksResponse = await fetch(`${publicRuntimeConfig.SPOTIFY_API}/v1/me/top/tracks?time_range=medium_term&limit=10&offset=5`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${spAccess}`
        }
      });
  
      const topTracksData = await topTracksResponse.json();
      
      return {
        props: {
          user: userData,
          topTracks: topTracksData
        }
      }
    }
      else {
        const userResponse = await fetch(`${publicRuntimeConfig.SPOTIFY_API}/v1/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${spAccess}`
          }
        });
    
        const userData = await userResponse.json();

        const topTracksResponse = await fetch(`${publicRuntimeConfig.SPOTIFY_API}/v1/me/top/tracks?time_range=medium_term&limit=10&offset=5`, {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${spAccess}`
          }
        });
    
        const topTracksData = await topTracksResponse.json();
        
        return {
          props: {
            user: userData,
            topTracks: topTracksData
          }
        }
      }
}

export default Dashboard;