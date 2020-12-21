import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { BsFillPauseFill,
  BsFillPlayFill,
  BsMusicNoteList,
  BsVolumeUp } from "react-icons/bs";

import { usePlaying, useUpdatePlaying } from "@/context/PlayingContext";

function Player () {
  const { playing,
    duration,
    currentPosition,
    playerOpen,
    currentTrack,
    tracklist } = usePlaying();
  const { setPlaying,
    setPlayerOpen,
    setClickedPosition,
    setCurrentTrack,
    setAudioSrc } = useUpdatePlaying();

  function convertDurationFormat (time = 0) {
    const mins = Math.floor(time / 60);
    const seconds = time - mins * 60;
    const hours = Math.floor(time / 3600);

    return `${hours !== 0
              ? `${hours}:`
              : ""}
            ${mins !== 0
              ? `${mins.toFixed(0)}:`
              : "0:"}
            ${seconds <= 9
              ? `0${seconds.toFixed(0)}`
              : seconds.toFixed(0)}`;
  }

  function playNextTrack () {
    let nextTrack;

    tracklist.forEach((track, index) => {
      if (track.trackName === currentTrack.trackName) {
        if (!tracklist[index + 1]) {
          const [newTrack] = tracklist;

          nextTrack = newTrack;
        } else {
          nextTrack = tracklist[index + 1];
        }

        setCurrentTrack(nextTrack);
        setAudioSrc(nextTrack);
      }
    });
  }

  function inputChangeHandler (event) {
    const audioInput = document.querySelector("#audio-player");

    audioInput.currentTime = event.target.value;
    setClickedPosition(audioInput.currentTime);
  }

  function resetTrackHandler (time) {
    const audioInput = document.querySelector("#audio-player");

    audioInput.currentTime = time;
    setClickedPosition(audioInput.currentTime);
  }

  function volumeChangeHandler (event) {
    const audioInput = document.querySelector("#audio-player");

    audioInput.volume = event.target.value;
  }

  function muteAudio () {
    const audioInput = document.querySelector("#audio-player");
    const volumeEl = document.querySelector("#input-volume");

    if (audioInput.muted) {
      audioInput.muted = false;
      volumeEl.value = audioInput.volume;
    } else {
      audioInput.muted = true;
      volumeEl.value = 0;
    }
  }

  return (
    <div className={`w-full ${!playerOpen
    ? "opacity-80"
    : "opacity-100 pb-8 pt-4"} text-txt px-4 lg:px-16 py-1 fixed bottom-0 left-0 z-10 bg-pri border-t-2`}
    >
      <button
      className="px-2 py-2 mr-4 border-2 rounded-full text-txt"
      onClick={() => setPlayerOpen(!playerOpen)}
      type="button"
      >
        <BsMusicNoteList className="text-txt" />
      </button>
      <div className="inline-flex items-center">
        <BsVolumeUp
        className="mr-2"
        onClick={muteAudio}
        />
        <input
        className={`${!playerOpen
        ? "hidden"
        : "block"}`}
        id="input-volume"
        max="1"
        min="0"
        onInput={(event) => volumeChangeHandler(event)}
        step="0.01"
        type="range"
        />
      </div>
      <div className={`flex ${playerOpen
        ? "h-32"
        : "h-0"}`}
      >
        <div className="w-full">
          <audio id="audio-player">
            <source id="audio-player-src" />
            <code>
                audio
            </code>
          </audio>
          <p className="text-sm text-center capitalize">
            {currentTrack
            ? currentTrack.trackName
            : "no track"}
          </p>
          <p className="text-xs text-center uppercase">
            {currentTrack
            ? currentTrack.artist
            : "no artist"}
          </p>

          <div className="w-4/5 h-4 mx-auto my-4 md:w-3/5">
            <div
            className="relative flex items-center mb-2 bg-blue-500 h-1/6"
            id="track-progress"
            >
              <input
              className="absolute w-full"
              id="track-input"
              max="30"
              min="0"
              onInput={(event) => {
                  inputChangeHandler(event);
                }}
              step="1"
              type="range"
              value={currentPosition}
              />
            </div>
            <div className="flex items-center justify-between">
              <p>
                {convertDurationFormat(currentPosition)}
              </p>
              <p className="inline-block ml-auto">
                {convertDurationFormat(duration)}
              </p>
            </div>

            <div className="flex justify-center">
              <button
              onClick={() => currentTrack && resetTrackHandler(0)}
              type="button"
              >
                <BiSkipPrevious className="text-lg cursor-pointer" />
              </button>
              <button
              onClick={() => currentTrack && setPlaying(!playing)}
              type="button"
              >
                {playing
                  ? <BsFillPauseFill
                  className="mx-8 text-lg cursor-pointer"
                    />
                  : <BsFillPlayFill
                  className="mx-8 text-lg cursor-pointer"
                    />}
              </button>
              <button
              onClick={() => currentTrack && tracklist && playNextTrack()}
              type="button"
              >
                <BiSkipNext className="text-lg cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
