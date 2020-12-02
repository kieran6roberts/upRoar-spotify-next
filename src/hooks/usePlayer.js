import { useState, useEffect } from "react";

const usePlayer = ({ initDuration, initCurrentPosition }) => {
  const [ playing, setPlaying ] = useState(false);
  const [ duration, setDuration ] = useState(initDuration);
  const [ currentPosition, setCurrentPosition ] = useState(initCurrentPosition);
  const [ clickedPosition, setClickedPosition ] = useState(null);
  
  useEffect(() => {
    const audioPlayer = document.querySelector("#audio-player");
    console.log(audioPlayer.currentTime)
    setDuration(audioPlayer.duration);
    setCurrentPosition(audioPlayer.currentTime);
    
    const setAudioTime = () => {
      setCurrentPosition(audioPlayer.currentTime);
    };
    
    
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
      audioPlayer.currentTime = clickedPosition
      console.log(audioPlayer.currentTime);
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
  }
};

export default usePlayer;