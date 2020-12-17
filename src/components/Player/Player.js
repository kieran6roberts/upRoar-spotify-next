import { BsFillPlayFill } from "react-icons/bs";
import { BsFillPauseFill } from "react-icons/bs";
import { BsMusicNoteList, 
  BsVolumeUp, 
  BsVolumeMute, 
  BsVolumeDown } from "react-icons/bs";
import { BiSkipNext } from "react-icons/bi";
import { BiSkipPrevious } from "react-icons/bi";
import { usePlaying, useUpdatePlaying } from "src/context/PlayingContext";

const Player = () => {
  const { playing, duration, currentPosition, playerOpen, currentTrack } = usePlaying();
  const { setPlaying, setPlayerOpen, setClickedPosition } = useUpdatePlaying();

  const convertDurationFormat = (time = 0) => {
    const mins = Math.floor(time / 60);
    const seconds = time - mins * 60;
    const hours = Math.floor(time / 3600);
    return `${hours != 0 ? `${hours}:` : ""}
            ${mins != 0 ? `${mins.toFixed(0)}:` : "0:"}
            ${seconds <= 9 ? `0${seconds.toFixed(0)}` : seconds.toFixed(0)}`;
  };

  const inputChangeHandler = event => {
      const audioInput = document.querySelector("#audio-player");
      audioInput.currentTime = event.target.value;
      setClickedPosition(audioInput.currentTime);
      };

  const resetTrackHandler = time => {
      const audioInput = document.querySelector("#audio-player");
      audioInput.currentTime = time;
      setClickedPosition(audioInput.currentTime);
    };
    
  const volumeChangeHandler = event => {
    const audioInput = document.querySelector("#audio-player");
    audioInput.volume = event.target.value;
  }

  const muteAudio = () => {
    const audioInput = document.querySelector("#audio-player");
    const volumeEl = document.querySelector("#input-volume");
    if (audioInput.muted) {
      audioInput.muted = false;
      volumeEl.value = audioInput.volume;
    }
    else {
      audioInput.muted = true;
      volumeEl.value = 0;
    }
  }

  return (
    <div className={`w-full ${!playerOpen ? "opacity-80" : "opacity-100 pb-8"} text-txt px-4 py-1 fixed bottom-0 left-0 z-50 bg-pri border-t-2`}>
      <button 
      onClick={() => setPlayerOpen(!playerOpen)}
      className="border-2 rounded-full border-purple-400 text-txt px-2 py-2 mr-4">
        <BsMusicNoteList className="text-txt"/>
      </button>
      <div className="inline-flex items-center">
        <BsVolumeUp onClick={muteAudio}
        className="mr-2"/>
        <input
          className={`${!playerOpen ? "hidden" : "block"}`}
          id="input-volume"
          type="range"
          step="0.01"
          min="0"
          max="1"
          onInput={event => volumeChangeHandler(event)} />
      </div>
      <div className={`flex ${playerOpen ? "h-32" : "h-0"}`}>
      <div className={"w-full"}>
          <audio id="audio-player">
            <source id="audio-player-src"/>
              <code>
                audio
              </code>
          </audio>
          <p className="text-sm capitalize text-center">
            {currentTrack ? currentTrack.track : "no track"}
          </p>
          <p className="text-xs uppercase text-center">
            {currentTrack ? currentTrack.artist : "no artist"}
          </p>

        <div className="w-3/5 mx-auto h-4 my-4">
          <div 
          id="track-progress"
          className={`flex items-center relative h-1/6 mb-2 bg-blue-500`} >
            <input
            id="track-input"
            type="range"
            min="0"
            max="30"
            value={currentPosition}
            step="1"
            className=""
            onInput={event => {
              inputChangeHandler(event);
            }}
            className={`absolute h-2 w-full rounded-full bg-red-300 cursor-pointer`} />
          </div>
          <div className="flex justify-between items-center">
            <p>
              {convertDurationFormat(currentPosition)}
            </p>
            <p className="inline-block ml-auto">
              {convertDurationFormat(duration)}
            </p>
          </div>

        <div className="flex justify-center">
          <button onClick={() => resetTrackHandler(0)}>
            <BiSkipPrevious className="text-lg cursor-pointer"/>
          </button>
          <button  onClick={() => setPlaying(!playing)}>
            {playing ?
              <BsFillPauseFill
              className="text-lg mx-8 cursor-pointer" />
            :
              <BsFillPlayFill 
              className="text-lg mx-8 cursor-pointer" />
            }
          </button>
          <button onClick={() => resetTrackHandler(30)}>
            <BiSkipNext className="text-lg cursor-pointer"/>  
          </button>
        </div>
      </div>
      </div>
      </div>
    </div>
  )
};

export default Player;