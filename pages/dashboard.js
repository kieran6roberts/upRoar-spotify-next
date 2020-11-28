import Layout from "src/containers/Layout/Layout";
import Button from "src/components/Button/Button";
import getConfig from "next/config";

const { publicRuntimeConfig } =  getConfig();

const spotifyUserUrl = `${publicRuntimeConfig.SPOTIFY_AUTH_API}/authorize
?client_id=${publicRuntimeConfig.SPOTIFY_CLIENT_ID}
&response_type=code
&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdashboard%2F
&scope=user-read-private%20user-read-email
&state=34fFs29kd09`;

const Dashboard = () => {

  return (
    <Layout>
      <main>
        <section>
          <h1 className="mt-8 mb-4 text-md">
            dashboard
          </h1>
          <p className="w-2/4 text-sm">
            For the best possible user experience we reccomend allowing us to access your spotify profile.
            This includes info such as your personal playlists and most listened to track.
          </p>
          <div className="h-0.5 w-3/5 bg-pri my-4" />
          <p className="w-2/4 mb-8 text-sm">
            Then we can personalize your experince to bring you the tracks and atrists you love.
          </p>
          <Button
           route="/dashboard/discover"
           extra="w-1/5 text-light-text hover:bg-light-bg hover:text-light-text">
            Allow us to access your spotify information
          </Button>
        </section>
      </main>
    </Layout>
  )
};

export default Dashboard;