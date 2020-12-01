import { useState, useEffect } from "react";

const usePlayer = () => {
  const [ playing, setPlaying ] = useState(false);
  const [ duration, setDuration ] = useState();
  const [ currentPosition, setCurrentPosition ] = useState();
  const [ clickedPosition, setClickedPosition ] = useState();
  
  useEffect(() => {
    const audioPlayer = document.querySelector("#audio-player");

    const setAudioPlayerData = () => {
      setDuration(audioPlayer.duration);
      setCurrentPosition(audioPlayer.currentTime);
    };

    const setAudioTime = () => setCurrentPosition(audioPlayer.currentTime);

    audioPlayer.addEventListener("loadeddata", setAudioPlayerData);
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
      audioPlayer.removeEventListener("loadeddata", setAudioPlayerData);
      audioPlayer.removeEventListener("timeupdate", setAudioTime);
    }
  });

  return {
    playing,
    setPlaying,
    duration,
    currentPosition,
    setClickedPosition
  }
};

export default usePlayer;