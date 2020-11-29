import Layout from "src/containers/Layout/Layout";
import Button from "src/components/Button/Button";
import { parseCookies } from "nookies";
import fetch from "isomorphic-fetch";
import getConfig from "next/config";
import useAuth from "src/context/AuthContext";

const { publicRuntimeConfig } =  getConfig();

const Dashboard = ({ userData }) => {
  return (
    <Layout>
      <main>
        <section>
          <h2 className="mt-8 mb-4 text-md">
            dashboard
          </h2>
          <div>
          <p className="text-md text-gray-400 mb-4">
            {userData.id}
          </p>
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
      
      return {
        props: {
          userData: userData,
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
        
        return {
          props: {
            userData: userData,
          }
        }
      }
}

export default Dashboard;