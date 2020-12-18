import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { BsFillPauseFill } from "react-icons/bs";
import { usePlaying, useUpdatePlaying } from "src/context/PlayingContext";

const Track = ({ id, trackName, trackImage, artist, album, releaseDate, spotifyLink, audioSrc }) => {
  const { playerOpen, playing, currentTrack } = usePlaying();
  const { setPlayerOpen, 
    setPlaying, 
    setCurrentTrack, 
    setAudioSrc } = useUpdatePlaying();

  return (
    <div className={`flex items-center text-txt py-4 px-2 my-2 w-full max-w-xl`}>
      <div className="relative">
        <img
        src={trackImage}
        alt="album cover"
        className="rounded"
        width={80}
        height={80} />
        <button id={id}
        onClick={() => setAudioSrc({ trackName, artist, src: audioSrc})}
        className="absolute flex justify-center items-center top-0 w-16 h-16 left-2/4 top-2/4 -mt-8 -ml-8 cursor-pointer">
          {playing && currentTrack.track === trackName ?
          <BsFillPauseFill className="text-opacity-50 text-xl text-white hover:text-opacity-80" />
          :
          <BsFillPlayFill className="text-opacity-50 text-xl text-white hover:text-opacity-80" />
          }
        </button>
      </div>
      <div className="pl-8 ">
        <h3 className="text-sm capitalize">
          {trackName}
        </h3>
        <span className="text-xs uppercase">
          {artist} -
        </span>
        <span className="text-xs uppercase">
          {album}  <span className="text-xxs capitalize">released on {releaseDate}</span>
        </span>
        <p className="text-xs">
          find the full version here
          <a 
          href={spotifyLink}
          className="text-green-500 ml-1">
            to spotify
          </a>
        </p>
      </div>
    </div>
  )
};

export default React.memo(Track);