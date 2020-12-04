import getConfig from "next/config";
import { parseCookies } from "nookies";
import Layout from "src/containers/Layout/Layout";

const { publicRuntimeConfig } = getConfig();

const Discover = () => {
  return (
    <Layout>
      <main>
        <section>
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

export async function getServerSideProps(cxt) {
  const authToken = parseCookies(ctx).spaccess;
  return {
    props: {}
  }
}

export default Discover;