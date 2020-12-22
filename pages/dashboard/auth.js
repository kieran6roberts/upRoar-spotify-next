import Image from "next/image";
import { parseCookies, setCookie } from "nookies";

import PageHead from "@/components/PageHead/PageHead";
import Layout from "@/containers/Layout/Layout";
import { fetcher } from "@/utility/fetcher";
import spotifyRedirect from "@/utility/spotify.js";

function Auth () {
  return (
    <>
    <PageHead
    currentURL="https://uproar-music.vercel.app/dashboard/auth"
    description="Link your upRoar music account to an existing spotify profile."
    title="upRoar - Auth"
    />
    <Layout>
      <h2 className="mt-12 text-center capitalize text-md text-txt">
          for your experience
      </h2>
      <div className="m-auto w-max">
        <Image
        alt="spotify logo"
        height={70}
        src="/images/spotify-seeklogo.com.svg"
        width={70}
        />
      </div>
      <p className="w-2/4 m-auto my-4 text-sm text-center text-txt">
          For the best possible user experience we reccomend allowing us to access your spotify profile.
          This includes info such as your personal playlists and most listened to track.
      </p>
      <p className="w-2/4 m-auto mb-20 text-sm text-center text-txt">
          Then we can personalize your experince to bring you the tracks and artists you love.
      </p>
      <button
      className="block w-2/5 px-4 py-2 m-auto my-2 text-xs text-center uppercase transition duration-150 ease-in border border-pink-400 rounded text-txt bg-pri md:px-6 hover:bg-sec"
      onClick={() => document.location.href = spotifyRedirect}
      role="link"
      type="button"
      >
         Allow us to access your spotify information
      </button>
    </Layout>
    </>
  );
}

export async function getServerSideProps (ctx) {
  const { query: { code } } = ctx;

  if (parseCookies(ctx).spaccess) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false
      }
    };
  }

  if (!code) {
    return {
      props: {}
    };
  }

  const queryString = require("query-string");

  const postOptions = {
    body: queryString.stringify({
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri: "http://localhost:3000/dashboard/auth/"
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST"
  };

  const postTokenSpotify = await fetcher(`${process.env.SPOTIFY_AUTH_API}/api/token`, postOptions);

  setCookie(ctx, "sprefresh", postTokenSpotify.refresh_token, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/"
  });

  setCookie(ctx, "spaccess", postTokenSpotify.access_token, {
    maxAge: 3600,
    path: "/"
  });

  return {
    redirect: {
      destination: "/dashboard",
      permanent: false
    }
  };

}

export default Auth;
