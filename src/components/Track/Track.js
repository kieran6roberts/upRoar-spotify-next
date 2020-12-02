import { FiPlayCircle } from "react-icons/fi";
import { FiPauseCircle } from "react-icons/fi";
import { usePlaying, useUpdatePlaying } from "src/context/PlayingContext";

const bgGradients = [
  "bg-gradient-to-r from-blue-500 to-purple-400 text-white",
  "bg-gradient-to-r from-yellow-300 to-green-200",
  "bg-gradient-to-r from-pink-400 to-red-500 text-white"
];

const getRandomColor = () => bgGradients[Math.floor(Math.random() * bgGradients.length)];
const color = getRandomColor();
console.log(color);


const Track = ({ trackName, trackImage, artist, album, releaseDate, spotifyLink, audioSrc }) => {
  const { playerOpen, playing } = usePlaying();
  const { setPlayerOpen, setPlaying } = useUpdatePlaying();

  const setAudioSrc = song => {
    if (!playerOpen) setPlayerOpen(!playerOpen);
    const audioPlayer = document.querySelector("#audio-player");
    const audioSrc = audioPlayer.querySelector("#audio-player-src");
    audioSrc.src = song;
    audioPlayer.load();
    setPlaying(true)
  }

  return (
    <div className={`flex flex-col items-center md:flex-row py-4 px-2 my-2 w-full max-w-xl border rounded`}>
      <div className="relative">
        <img
        src={trackImage}
        alt="album cover"
        className="rounded"
        width={200}
        height={200} />
        <button 
        onClick={() => setAudioSrc(audioSrc)}
        className="absolute flex justify-center top-0 w-32 left-2/4 top-2/4 -mt-12 -ml-16 cursor-pointer">

        <FiPauseCircle className="text-white text-opacity-50 text-xxxl hover:text-opacity-80" />
          
        <FiPlayCircle className="text-white text-opacity-50 text-xxxl hover:text-opacity-80" />
        </button>
      </div>
      <div className="pl-8 ">
        <h3 className="text-lg capitalize">
          {trackName}
        </h3>
        <span className="text-md uppercase">
          {artist} -
        </span>
        <span className="text-md uppercase">
          {album}
        </span>
        <p className="text-sm capitalize py-2">
          released on {releaseDate}
        </p>
        <p className="text-sm">
          find the full version here
          <a 
          href={spotifyLink}
          className="text-pri ml-1">
            Spotify
          </a>
        </p>
      </div>
    </div>
  )
};

export default Track;