import Layout from "src/containers/Layout/Layout";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const Discover = () => {
  return (
    <Layout>
      <main>
        <section>
          <h2 className="mt-8 mb-4 text-md">
            Discover
          </h2>
        </section>
      </main>
    </Layout>
  )
};

export async function getServerSideProps(cxt) {
  return {
    props: {}
  }
}

export default Discover;