import { FiPlayCircle } from "react-icons/fi";
import { FiPauseCircle } from "react-icons/fi";

const bgGradients = [
  "bg-gradient-to-r from-orange-400 via-red-500 to-pink-500"
];

const getRandomColor = () => bgGradients[Math.floor(Math.random() * bgGradients.length)];
const color = getRandomColor();
console.log(color);


const Track = ({ trackName, trackImage, artist, album, releaseDate, spotifyLink, audioSrc }) => {

  return (
    <div className={`${getRandomColor()} flex flex-col items-center md:flex-row py-4 px-2 my-2 w-full max-w-xl border rounded`}>
      <div className="relative">
        <img
        src={trackImage}
        alt="album cover"
        className="rounded"
        width={200}
        height={200} />
        <button 
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