import Layout from "src/containers/Layout/Layout";
import Button from "src/components/Button/Button";
import { setCookie, parseCookies } from "nookies";
import fetch from "isomorphic-fetch";
import getConfig from "next/config";

const { publicRuntimeConfig } =  getConfig();

const spotifyUserUrl = `https://accounts.spotify.com/authorize
?client_id=${publicRuntimeConfig.SPOTIFY_CLIENT_ID}
&response_type=code
&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdashboard%2F
&scope=user-read-private%20user-read-email
&state=34fFs29kd09`;

const Dashboard = () => {


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
          <p className="w-2/4 text-sm">
            For the best possible user experience we reccomend allowing us to access your spotify profile.
            This includes info such as your personal playlists and most listened to track.
          </p>
          <div className="h-0.5 w-3/5 bg-pri my-4" />
          <p className="w-2/4 mb-8 text-sm">
            Then we can personalize your experince to bring you the tracks and atrists you love.
          </p>
          <button
           onClick={() => document.location.href = spotifyUserUrl}
           className="w-1/5 block text-xs uppercase text-center px-4 my-2 md:px-6 py-2 border border-light-text rounded transition duration-150 ease-in text-light-text hover:bg-light-bg hover:text-light-text">
            Allow us to access your spotify information
          </button>
        </section>
      </main>
    </Layout>
  )
};

export async function getServerSideProps(ctx) {
  const { query: { code }} = ctx;

  const spCookie = parseCookies(ctx).sptoken;

  if (!spCookie) {
    setCookie(ctx, "sptoken", code, {
      maxAge: 3600,
      path: '/'
    });
  }


  const queryString = require("query-string");

  const bodyParams = {
    grant_type: "authorization_code",
    code: code,
    redirect_uri: "http://localhost:3000/dashboard/",
    client_id: publicRuntimeConfig.SPOTIFY_CLIENT_ID,
    client_secret: publicRuntimeConfig.SPOTIFY_CLIENT_SECRET,
  };

  const response = await fetch(`https://accounts.spotify.com/api/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: queryString.stringify(bodyParams)
  });

  const data = await response.json();

    const userResponse = await fetch(`${publicRuntimeConfig.SPOTIFY_API}/v1/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${data.access_token}`
      }
    });

    const userData = await userResponse.json();

      const refreshBody = {
        grant_type: "refresh_token",
        refresh_token: data.refresh_token,
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
  
  return {
    props: {
      userData: userData,
      refreshedData: refreshData,
      checkData: data
    }
  }
}

export default Dashboard;