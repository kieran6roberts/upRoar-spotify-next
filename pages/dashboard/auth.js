import fetch from "isomorphic-fetch";
import { setCookie, parseCookies } from "nookies";
import getConfig from "next/config";
import Layout from "src/containers/Layout/Layout";

const { publicRuntimeConfig } = getConfig();
const spotifyUserUrl = publicRuntimeConfig.SPOTIFY_REDIRECT;

const Auth = () => {

  return (
    <Layout>
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
    </Layout>
  )
};

export async function getServerSideProps(ctx) {
  const { publicRuntimeConfig } = getConfig();
  const { query: { code }} = ctx;

  if (parseCookies(ctx).sprefresh) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false
      }
   }
  }
  
  if (!code) {
    return {
      props: {}
    }
  }
    else {
      const queryString = require("query-string");

      const bodyParams = {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "http://localhost:3000/dashboard/auth/",
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

      setCookie(ctx, "sprefresh", data.refresh_token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      });

      setCookie(ctx, "spaccess", data.access_token, {
        maxAge: 3600,
        path: '/'
      });

      return {
        redirect: {
          destination: "/dashboard",
          permanent: false
        }
        }
      }
};

export default Auth;