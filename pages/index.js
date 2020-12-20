import Link from "next/link";

import { parseCookies } from "nookies";
import { HiOutlineArrowNarrowDown } from "react-icons/hi";
import { CgMusicSpeaker } from "react-icons/cg";
import { VscDebugDisconnect } from "react-icons/vsc";
import { RiMedal2Line } from "react-icons/ri";

import Button from "../src/components/Button/Button";
import Layout from "../src/containers/Layout/Layout";
import Card from "../src/components/Card/Card";

const Home = () => {
  return (
  <Layout title="Home">
    <main>
      <section 
      id="home-hero"
      className="pt-8">
        <div className="w-4/5 m-auto uppercase">
          <h2 className="mb-4 font-bold text-center text-xxl text-txt">
            play
          </h2>
          <h2 className="mb-4 text-xl font-bold text-center text-txt">
            discover
          </h2>
          <h2 className="mb-8 text-lg text-center text-txt">
            personalize
          </h2>
        </div>
        <div className="">
            <Button
            route="/login"
            extra="w-2/5 max-w-40 border border-pink-200 m-auto text-txt hover:bg-sec hover:text-sec">
              login
            </Button>
            <Button
            route="/register"
            extra="w-2/5 max-w-40 m-auto bg-pink-200 hover:bg-pink-300 hover:text-sec">
              sign up
            </Button>
        </div>
        <HiOutlineArrowNarrowDown className="m-auto my-16 text-lg text-gray-300 w-max animate-bounce"/>
      </section>
      <section className="px-8 text-txt md:px-12 xl:px-16">
        <p className="text-xs font-bold text-center uppercase">
          come an see what upRoar has to offer
        </p>

        <div className="w-4/5 m-auto h-0.5 bg-gray-300 mt-4 mb-16" />

        <div className="lg:flex">
          <div className="mx-3 lg:flex-1">
            <Card title="connect"
            bgClr="bg-pink-400"
            text="enhance your experience with spotify"
            icon={<VscDebugDisconnect className="text-white text-xxl"/>} />
            <p className="mt-8 mb-32 text-sm">
              Through spotify's developer API you have access to all the tracks, artists and albums you
              could ever wish to need. Sign up to upRoar before connecting your new account to
              your exisiting spotify profile in seconds and lose yourself in the music.
            </p>
          </div>
          <div className="mx-3 lg:flex-1">
            <Card title="Discover"
            bgClr="bg-yellow-200"
            text="Search through thousands of tracks, albums and playlists"
            icon={<CgMusicSpeaker className="text-black text-xxl"/>} />
            <p className="mt-8 mb-32 text-sm">
              Through spotify's developer API you have access to all the tracks, artists and albums you
              could ever wish to need. Have something in mind, then use our searchbar and discover
              yourself what is out there.
            </p>
          </div>
          <div className="mx-3 lg:flex-1">
            <Card title="Recommendations"
            bgClr="bg-purple-400"
            text="Get personal artist recommendations"
            icon={<RiMedal2Line className="text-white text-xxl"/>} />
            <p className="mt-8 mb-32 text-sm">
              Get access to upRoar's artists recommendations based on your current spotify tastes. 
              Visit our discover page and listen to new and trending hits, as well as artists 
              who we think you might like.
            </p>
          </div>
        </div>
      </section>

      <div className="w-4/5 m-auto h-0.5 bg-gray-300 mt-4 mb-16" />

      <section>
        <div className="mb-16 text-center text-txt">
          <h3 className="mb-4 text-lg">
            upRoar Music App
          </h3>
          <p className="mb-8 text-xl font-bold text-txt">
            100% free 
          </p>
          <ul className="text-sm uppercase">
            <li className="w-2/5 p-2 m-auto mb-4 border-t-2 border-b-2 border-pink-200">
              all tracks
            </li>
            <li className="w-2/5 p-2 m-auto mb-4 border-t-2 border-b-2 border-yellow-200 text-txt">
              all albums
            </li>
            <li className="w-2/5 p-2 m-auto mb-4 border-t-2 border-b-2 border-purple-400">
              all playlists
            </li>
          </ul>

          <p className="mt-20 mb-12 text-xs text-center text-txt">
            Sign up today for free and enjoy the latest and greatest from the world of music
            for absolutely free!
          </p>

          <Button
          route="/register"
          extra="w-2/5 max-w-40 m-auto border border-indigo-500 text-txt hover:bg-sec hover:text-sec">
            sign up
          </Button>
        </div>
      </section>
    </main>
  </Layout>
  )
};

export async function getServerSideProps(ctx) {
  const jwt = parseCookies(ctx).jwt;
  if (jwt) {
    return {
      redirect: {
        destination: "/dashboard",
        permanenet: false
      }
    }
  }
  return {
    props: {}
  }
}

export default Home;