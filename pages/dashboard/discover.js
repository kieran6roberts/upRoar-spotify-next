import getConfig from "next/config";
import { parseCookies } from "nookies";
import Image from "next/image";
import useSWR from "swr";
import { fetcher } from "src/hooks/useFetch";

import Layout from "src/containers/Layout/Layout";

const { publicRuntimeConfig } = getConfig();

const Discover = () => {
  const { data, error } = useSWR(`${publicRuntimeConfig.SPOTIFY_API}`, fetcher, { 
    initialData: 
  });

  return (
    <Layout>
      <main>
        <section className="md:px-24">
          <h2 className="text-lg uppercase text-txt mt-8 mb-4">
            discover
          </h2>
          <p className="text-md uppercase text-txt mt-8 mb-4">
            the latest and greatest form the world of music
          </p>
        </section>
      </main>
    </Layout>
  )
};

export async function getServerSideProps(ctx) {
  const authToken = parseCookies(ctx).spaccess;

  /*
  const [  ] = await Promise.all([
    fetcher(`${publicRuntimeConfig.SPOTIFY_API}${}`, {       
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      }}),
      fetcher(`${publicRuntimeConfig.SPOTIFY_API}${}`, {       
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        }}),
      fetcher(`${publicRuntimeConfig.SPOTIFY_API}${}`, {       
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        }})
  ]);
  */

  return {
    props: {}
  }
}

export default Discover;