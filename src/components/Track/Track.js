import React from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";

import { usePlaying, useUpdatePlaying } from "@/context/PlayingContext";

function Track ({ id,
  trackName,
  trackImage,
  artist,
  album,
  releaseDate,
  spotifyLink,
  audioSrc }) {
  const { playing, currentTrack } = usePlaying();
  const { setAudioSrc } = useUpdatePlaying();

  return (
    <div className="flex items-center w-full max-w-xl px-2 py-4 my-2 text-txt">
      <div className="relative">
        <img
        alt="album cover"
        className="rounded"
        height={120}
        src={trackImage}
        width={120}
        />
        <button
        className="absolute top-0 flex items-center justify-center w-24 h-24 -mt-12 -ml-12 cursor-pointer left-2/4 top-2/4"
        id={id}
        onClick={() => setAudioSrc({ trackName,
            artist,
            src: audioSrc })}
        type="button"
        >
          {playing && currentTrack.track === trackName
            ? <BsFillPauseFill className="text-white text-opacity-50 text-xxxl hover:text-opacity-80" />
            : <BsFillPlayFill className="text-white text-opacity-50 text-xxxl hover:text-opacity-80" />}
        </button>
      </div>
      <div className="pl-8">
        <h3 className="capitalize text-md">
          {trackName}
        </h3>
        <span className="text-sm text-pink-600 uppercase">
          {artist} -
        </span>
        <span className="text-xs uppercase">
          {album}
        </span>
        <p className="text-xs">
            find the full version here
          <a
          className="ml-1 text-green-500"
          href={spotifyLink}
          >
            to spotify
          </a>
        </p>
        <p className="capitalize text-xxs">
            released on {releaseDate}
        </p>
      </div>
    </div>
  );
}

export default React.memo(Track);
