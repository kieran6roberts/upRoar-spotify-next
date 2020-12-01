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
    setClickedPosition } = usePlaying();

  const currentPositionPercent = currentPosition / duration * 100;

  const calculateClickedPosition = event => {
    const coordX = event.pageX;
    const progressEl = document.querySelector("#track-progress");
    const progressElWidth = progressEl.offsetWidth;
    const progressElStartPosition = progressEl.getBoundingClientRect().left + window.scrollX;
    const clickedPositionTime = (coordX - progressElStartPosition) * (duration / progressElWidth);
    return clickedPositionTime;
  };


  const trackProgressDragHandler = event => {
    console.log("track change");
  };

  return (
    <div className={`w-full h-40 m-2 border fixed bottom-0 left-0 bg-pri`}>
        <audio id="audio-player">
          <source src={audioSrc}/>
            <code>
              audio
            </code>
        </audio>
      <p className="text-md capitalize text-center">
        track
      </p>
      <p className="text-sm mb-4 uppercase text-center">
        artist
      </p>
      <div className="w-4/5 mx-auto h-0.5">
        <div className="flex justify-between items-center">
          <p>
            0
          </p>
          <p className="inline-block ml-auto">
            duration: {duration}
          </p>
        </div>
        <div 
        id="track-progress"
        className={`relative h-full mt-4 bg-blue-500`}
        style={{ width: `${currentPositionPercent}%`}} >
          <div 
          onMouseDown={event => trackProgressDragHandler(event)}
          className={`absolute h-4 w-4 rounded-full bg-red-300 cursor-pointer`} />
          </div>
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
  )
};

export default Player;