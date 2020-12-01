import { FiPlayCircle } from "react-icons/fi";
import { FiPauseCircle } from "react-icons/fi";
import { BiSkipNext } from "react-icons/bi";
import { BiSkipPrevious } from "react-icons/bi";
import usePlaying from "src/hooks/usePlayer";

const Player = ({ audioSrc }) => {
  const { playing, 
    setPlaying, 
    duration, 
    currentPosition, 
    setClickedPosition,
    currentPositionPercent } = usePlaying({ initDuration: 0, initCurrentPosition: 0 });

  const calculateClickedPosition = event => {
    const coordX = event.pageX;
    const progressEl = document.querySelector("#track-progress");
    const progressElWidth = progressEl.offsetWidth;
    const progressElStartPosition = progressEl.getBoundingClientRect().left + window.scrollX;
    const clickedPositionTime = (coordX - progressElStartPosition) * (duration / progressElWidth);
    return clickedPositionTime;
  };

  const convertDurationFormat = (time = 0) => {
    const mins = Math.floor(time / 60);
    const seconds = time - mins * 60;
    const hours = Math.floor(time / 3600);
    return `${hours !== 0 ? `${hours}:` : ""}
            ${mins !== 0 ? `${mins.toFixed(0)}:` : "0:"}
            ${seconds.toFixed(0)}`;
  };

  return (
    <div className={`w-full h-40 border fixed bottom-0 left-0 bg-pri`}>
        <audio id="audio-player">
          <source src={audioSrc}/>
            <code>
              audio
            </code>
        </audio>

        <p className="text-md capitalize text-center">
          track
        </p>
        <p className="text-sm uppercase text-center">
          artist
        </p>

      <div className="w-3/5 mx-auto h-4 my-4">
        <div 
        id="track-progress"
        className={`flex items-center relative h-1/6 mb-2 bg-blue-500`} >
          <input
          type="range"
          min="0"
          max="300"
          step="1"
          value={currentPositionPercent}
          onChange={event => console.log("change")}
          className={`absolute h-2 w-full rounded-full bg-red-300 cursor-pointer`} />
        </div>
        <div className="flex justify-between items-center">
          <p>
            
          </p>
          <p className="inline-block ml-auto">
            {convertDurationFormat(duration)}
          </p>
        </div>

      <div className="flex justify-center">
        <button>
          <BiSkipPrevious className="text-xl cursor-pointer"/>
        </button>
        <button  onClick={() => setPlaying(!playing)}>
          {playing ?
            <FiPauseCircle
            className="text-xl mx-8 cursor-pointer" />
          :
            <FiPlayCircle 
            className="text-xl mx-8 cursor-pointer" />
          }
        </button>
        <button>
          <BiSkipNext className="text-xl cursor-pointer"/>  
        </button>
      </div>
    </div>
  </div>
  )
};

export default Player;