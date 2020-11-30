import Image from "next/image";

const Track = ({ trackName, trackImage, artist, album, releaseDate, spotifyLink, preview }) => {
  return (
    <div className="flex flex-col items-start md:flex-row py-4">
      <div>
        <img
        src={trackImage}
        alt="album cover"
        width={200}
        height={200} />
      </div>
      <div className="pl-8">
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
        <button 
        className="block text-xs uppercase text-center px-4 my-2 md:px-6 py-2 border border-light-text rounded transition duration-150 ease-in">
          <audio 
          src={preview}/>
        </button>
      </div>
    </div>
  )
};

export default Track;