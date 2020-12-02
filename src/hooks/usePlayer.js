import { useState, useEffect } from "react";

const usePlayer = ({ initDuration, initCurrentPosition }) => {
  const [ playing, setPlaying ] = useState(false);
  const [ duration, setDuration ] = useState(initDuration);
  const [ currentPosition, setCurrentPosition ] = useState(initCurrentPosition);
  const [ clickedPosition, setClickedPosition ] = useState(null);
  const [ playerOpen, setPlayerOpen ] = useState(false);
  
  useEffect(() => {
    const audioPlayer = document.querySelector("#audio-player");
    
    const setAudioTime = () => {
      setDuration(audioPlayer.duration);
      setCurrentPosition(audioPlayer.currentTime);
    };
    
    audioPlayer.addEventListener("loadeddata", setAudioTime);
    audioPlayer.addEventListener("timeupdate", setAudioTime);
    
    if (playing) {
      audioPlayer.play()
        .then(() => {})
        .catch(err => console.error(err))
      }
      else audioPlayer.pause();
    
    if (clickedPosition && clickedPosition !== currentPosition) {
      audioPlayer.currentTime = clickedPosition
      setClickedPosition(null);
    }
    
    return () => {
      audioPlayer.removeEventListener("loadeddata", setAudioTime);
      audioPlayer.removeEventListener("timeupdate", setAudioTime);
    }
  });

  return {
    playing,
    setPlaying,
    duration,
    currentPosition,
    setClickedPosition,
    playerOpen,
    setPlayerOpen
  }
};

export default usePlayer;