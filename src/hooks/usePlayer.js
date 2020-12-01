import { useState, useEffect } from "react";

const usePlayer = ({ initDuration, initCurrentPosition }) => {
  const [ playing, setPlaying ] = useState(false);
  const [ duration, setDuration ] = useState(initDuration);
  const [ currentPosition, setCurrentPosition ] = useState(initCurrentPosition);
  const [ clickedPosition, setClickedPosition ] = useState();
  const [ currentPositionPercent, setCurrentPositionPercent ] = useState(0);
  
  useEffect(() => {
    const audioPlayer = document.querySelector("#audio-player");

    const setAudioTime = () => {
      setCurrentPosition(audioPlayer.currentTime);
      setCurrentPositionPercent(currentPosition / duration * 100);
    };
    
    setDuration(audioPlayer.duration);
    setCurrentPosition(audioPlayer.currentTime);
    
    audioPlayer.addEventListener("timeupdate", setAudioTime);
    
    if (playing) {
      let playPromise = audioPlayer.play();
      if (playPromise) {
        playPromise.then(() => {
          
        })
        .catch(err => console.error(err))
      }
    }
     else audioPlayer.pause();
    
    if (clickedPosition && clickedPosition !== currentPosition) {
      audioPlayer.currentPosition = clickedPosition;
      setClickedPosition(null);
    }
    
    return () => {
      audioPlayer.removeEventListener("timeupdate", setAudioTime);
    }
  });

  return {
    playing,
    setPlaying,
    duration,
    currentPosition,
    setClickedPosition,
    currentPositionPercent
  }
};

export default usePlayer;