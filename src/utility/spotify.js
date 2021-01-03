import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const scopes = [
  "user-read-private",
  "user-read-email",
  "user-top-read",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "playlist-read-collaborative",
  "user-library-read"
];

const spotifyRedirect = `${publicRuntimeConfig.SPOTIFY_AUTH_API}/authorize?client_id=${publicRuntimeConfig.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=https%3A%2F%2Fuproar-music.vercel.app%2Fdashboard%2Fauth&scope=${scopes.join("%20")}&state=34fFs29kd09`;

export default spotifyRedirect;
