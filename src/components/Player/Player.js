import { BsFillPlayFill } from "react-icons/bs";
import { FiPauseCircle } from "react-icons/fi";
import { BiSkipNext } from "react-icons/bi";
import { BiSkipPrevious } from "react-icons/bi";
import usePlayer from "src/hooks/usePlayer";
import { usePlaying, useUpdatePlaying } from "src/context/PlayingContext";

const Player = () => {
  const { playing, duration, currentPosition, playerOpen } = usePlaying();
  const { setPlaying, setPlayerOpen, setClickedPosition } = useUpdatePlaying();

  const convertDurationFormat = (time = 0) => {
    const mins = Math.floor(time / 60);
    const seconds = time - mins * 60;
    const hours = Math.floor(time / 3600);
    return `${hours !== 0 ? `${hours}:` : ""}
            ${mins !== 0 ? `${mins.toFixed(0)}:` : "0:"}
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

  return (
    <div className={`w-full max-w-2xl px-8 ${!playerOpen && "opacity-50"} text-txt p-2 fixed bottom-0 left-0 bg-pri`}>
      <button 
      onClick={() => setPlayerOpen(!playerOpen)}
      className="ml-4 p-1 bg-txt text-acc">
        hide player
      </button>
      <div className={`flex ${playerOpen ? "h-32" : "h-0"}`}>
      <div className={"w-full"}>
          <audio id="audio-player">
            <source id="audio-player-src"/>
              <code>
                audio
              </code>
          </audio>

          <p className="text-sm capitalize text-center">
            track
          </p>
          <p className="text-xs uppercase text-center">
            artist
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
              <FiPauseCircle
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
        <input
        className="transform rotate-90"
        id="input-volume"
        type="range"
        step="0.01"
        min="0"
        max="1"
        onInput={event => volumeChangeHandler(event)} />
      </div>
    </div>
  )
};

export default Player;