import React from "react";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { BsFillPauseFill,
  BsFillPlayFill,
  BsMusicNoteList,
  BsVolumeUp } from "react-icons/bs";

import { usePlaying, useUpdatePlaying } from "@/context/PlayingContext";
import convertDurationFormat from "@/utility/formatDuration";


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
    let nextTrack;

    if (audioInput.currentTime < 2) {
      tracklist.forEach((track, index) => {
        if (track.trackName === currentTrack.trackName) {
          if (!tracklist[index - 1]) {
            const [newTrack] = tracklist;

            nextTrack = newTrack;
          } else {
            nextTrack = tracklist[index - 1];
          }

          setCurrentTrack(nextTrack);
          setAudioSrc(nextTrack);
        }
      });
    }

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
    : "opacity-100 pb-8 pt-4"} text-txt text-sm px-4 2xl:px-12 lg:px-16 py-1 2xl:py-8 fixed bottom-0 left-0 z-10 bg-pri border-t-2`}
    >
      <button
      className="p-2 mr-4 border-2 rounded-full 2xl:p-4 text-txt"
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
        ? "h-32 2xl:h-56"
        : "h-0"}`}
      >
        <div className="w-full 2xl:py-8">
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
                {isNaN(convertDurationFormat(duration))
                ? ""
                : convertDurationFormat(duration)}
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

export default React.memo(Player);
