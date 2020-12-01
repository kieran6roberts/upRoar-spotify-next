import Button from "../src/components/Button/Button";
import Layout from "../src/containers/Layout/Layout";

const Home = () => {
  return (
  <Layout title="Home">
    <main>
      <section 
      id="home-hero"
      className="w-full flex flex-col justify-evenly pt-8">
        <h2 className="text-lg mb-4">
          play your favourite songs
        </h2>
        <h2 className="text-lg mb-4">
          find nearby events
        </h2>
        <h2 className="text-lg mb-8">
          get more from your music
        </h2>
        <div className="">
            <Button
            route="/login"
            extra="w-2/5 text-txt hover:bg-sec hover:text-sec">
              login
            </Button>
            <Button
            route="/register"
            extra="w-2/5 text-txt hover:bg-sec hover:text-sec">
              sign up
            </Button>
        </div>
      </section>
    </main>
  </Layout>
  )
};

export default Home;