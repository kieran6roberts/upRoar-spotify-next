import { setCookie, parseCookies } from "nookies";
import getConfig from "next/config";
import Image from "next/image";

import Layout from "src/containers/Layout/Layout";
import spotifyRedirect from "src/spotify";
import { fetcher } from "src/hooks/useFetch";

const Auth = () => {
  return (
    <Layout>
      <h2 className="mt-12 text-center capitalize text-md text-txt">
        for your experience
      </h2>
      <div className="m-auto w-max">
        <Image 
          src="/images/spotify-seeklogo.com.svg"
          alt="spotify logo"
          height={70}
          width={70} />
      </div>
      <p className="w-2/4 m-auto mt-4 text-sm text-center text-txt">
      For the best possible user experience we reccomend allowing us to access your spotify profile.
      This includes info such as your personal playlists and most listened to track.
    </p>
    <div className="h-0.5 w-3/5 bg-pri my-4" />
    <p className="w-2/4 m-auto mb-8 text-sm text-center text-txt">
      Then we can personalize your experince to bring you the tracks and artists you love.
    </p>
    <button
      role="link"
      onClick={() => document.location.href = spotifyRedirect}
      className="block w-2/5 px-4 py-2 m-auto my-2 text-xs text-center uppercase transition duration-150 ease-in border border-pink-400 rounded text-txt bg-pri md:px-6 hover:bg-sec">
        Allow us to access your spotify information
      </button>
    </Layout>
  )
};

export async function getServerSideProps(ctx) {
  const { publicRuntimeConfig } = getConfig();
  const { query: { code }} = ctx;

  if (parseCookies(ctx).spaccess) {
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

      const postOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: queryString.stringify({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: "http://localhost:3000/dashboard/auth/",
          client_id: publicRuntimeConfig.SPOTIFY_CLIENT_ID,
          client_secret: publicRuntimeConfig.SPOTIFY_CLIENT_SECRET,
        })
      };

      const postTokenSpotify = await fetcher(`${publicRuntimeConfig.SPOTIFY_AUTH_API}/api/token`, postOptions);

      setCookie(ctx, "sprefresh", postTokenSpotify.refresh_token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      });

      setCookie(ctx, "spaccess", postTokenSpotify.access_token, {
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