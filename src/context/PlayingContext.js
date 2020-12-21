import { createContext, useContext, useState } from "react";

import usePlayer from "@/hooks/usePlayer";

const PlayingContext = createContext();
const PlayingUpdateContext = createContext();

export function usePlaying () {
  return useContext(PlayingContext);
}
export function useUpdatePlaying () {
  return useContext(PlayingUpdateContext);
}

function PlayingProvider ({ children }) {
  const [
    currentTrack,
    setCurrentTrack
  ] = useState(null);
  const [
    tracklist,
    setTracklist
  ] = useState([]);

  const { playing,
    setPlaying,
    duration,
    currentPosition,
    setClickedPosition,
    playerOpen,
    setPlayerOpen } = usePlayer({ initDuration: 0,
    initCurrentPosition: 0 });

  function setAudioSrc ({ trackName, artist, src }) {
    if (!playerOpen) {
      setPlayerOpen(!playerOpen);
    }
    const audioPlayer = document.querySelector("#audio-player");
    const audioSrc = audioPlayer.querySelector("#audio-player-src");

    audioSrc.src = src;
    audioPlayer.load();
    setPlaying(true);
    setCurrentTrack({
      artist,
      src,
      trackName
    });
  }

  return (
    <PlayingContext.Provider value={{ currentPosition,
      currentTrack,
      duration,
      playerOpen,
      playing,
      tracklist }}
    >
      <PlayingUpdateContext.Provider value={{ setAudioSrc,
        setClickedPosition,
        setCurrentTrack,
        setPlayerOpen,
        setPlaying,
        setTracklist }}
      >
        {children}
      </PlayingUpdateContext.Provider>
    </PlayingContext.Provider>
  );
}

export default PlayingProvider;

