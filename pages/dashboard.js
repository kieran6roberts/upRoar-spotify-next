import { parseCookies } from "nookies";
import getConfig from "next/config";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";

import Layout from "src/containers/Layout/Layout";
import TrackList from "src/components/TrackList/TrackList";
import Albums from "src/components/Albums/Albums";
import Player from "src/components/Player/Player";
import { fetcher } from "src/hooks/useFetch";
import PlayingProvider from "src/context/PlayingContext";
import FormInput from "src/components/FormInput/FormInput";
import userSearchValidation from "src/validation/userSearch";
import useForm from "src/hooks/useForm";

const { publicRuntimeConfig } =  getConfig();

const Dashboard = ({ userInfo, topTracks, newReleases }) => {
  let topTracksItems;
  let newReleasesItems;
  if (!topTracks.error) topTracksItems = topTracks.items;
  if (!newReleases.error) newReleasesItems = newReleases.albums.items;

  const fetchQuery = async () => {
    console.log(inputValues.search);
    //const data = await fetcher(`${publicRuntimeConfig.SPOTIFY_API}/v1/search?q=${}`)
  };

  const {
    inputValues, 
    errors, 
    submitting, 
    inputChangeHandler, 
    submitHandler
  } = useForm({ stateInit: { search: "" }, validate: userSearchValidation, submitFunc: fetchQuery });

  return (
    <PlayingProvider>
      <Layout>
        <main>
          <section className="md:px-24">
            <div className="mt-4">
              <div className="w-full border-b-2">
                <button 
                className="py-4 px-4 text-txt mr-2"
                onClick={submitHandler}>
                  <BsSearch />
                </button>
                <input 
                id="search"
                name="search"
                type="text"
                value={inputValues.search}
                className="w-5/6 py-2 px-4 bg-pri text-txt focus:outline-none"
                onChange={inputChangeHandler} />
                <div className={`h-0 transition-all duration-200 ease-in-out bg-blue-500
                ${inputValues.search && "h-80 bg-blue-200"}`}></div>
              </div>
            </div>
            <h2 className="text-sm text-right text-txt ml-auto mt-4">
                dashboard
              </h2>
            <div className="flex items-center justify-end text-md text-gray-400 ml-auto mb-4">
              <Image 
              src="/images/spotify-seeklogo.com.svg"
              alt="spotify logo"
              height={70}
              width={70} />
              {!userInfo.error || !userInfo.error.status == 401 ?
              <p className="text-sm text-txt ml-4">
                {userInfo.id}
              </p>
              :
              <p className="text-sm text-txt ml-4">
                No spotify account connected
              </p>
              }
            </div>
            <h3 className="text-lg uppercase text-txt my-16">
              Discover new releases 
            </h3>
            {!newReleases.error || !newReleases.error.status == 401 
            ?
            <Albums albums={newReleasesItems} />
              :
              <span className="text-sm text-txt capitalize">
              new releases not available
            </span>
            }
            <h3 className="text-sm text-lg uppercase uppercase text-txt my-16">
              your current top tracks
            </h3>
            <div>
              {!topTracks.error || !topTracks.error.status == 401 
              ?
              <TrackList tracks={topTrackItems} />
              :
              <span className="text-sm text-txt capitalize">
                no top tracks
              </span>
              }
            </div>
            <Player />
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
      const newReleaseQuery = "/v1/browse/new-releases?offset=0&limit=6";

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