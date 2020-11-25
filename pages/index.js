import Button from "../src/components/Button/Button";
import Layout from "../src/containers/Layout/Layout";

const Home = () => (
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
          width="w-full"
          bg="bg-light-text"
          clr="text-light-bg"
          hovBg="hover:bg-light-bg"
          hovClr="hover:text-light-text">
            sign in with spotify
          </Button>
          <div className="flex justify-between mt-4">
            <Button
            route="/login"
            width="w-2/5"
            hovBg="hover:bg-gray-50">
              login
            </Button>
            <Button
            route="/register"
            width="w-2/4"
            clr="text-light-text"
            hovBg="hover:bg-pri"
            hovClr="hover:text-light-bg">
              sign up
            </Button>
          </div>
        </div>
      </section>
    </main>
  </Layout>
);

export default Home;