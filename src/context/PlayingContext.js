import { createContext, useContext, useState } from "react";
import usePlayer from "src/hooks/usePlayer";

const PlayingContext = createContext();
const PlayingUpdateContext = createContext();

export const usePlaying = () => useContext(PlayingContext);
export const useUpdatePlaying = () => useContext(PlayingUpdateContext);

const PlayingProvider = ({ children }) => {
    const [ currentTrack, setCurrentTrack ] = useState(null);
    const [ tracklist, setTracklist ] = useState([]);

    const { 
        playing, 
        setPlaying, 
        duration, 
        currentPosition,
        setClickedPosition,
        playerOpen,
        setPlayerOpen } = usePlayer({ initDuration: 0, initCurrentPosition: 0 });

    const setAudioSrc = ({ trackName, artist, src }) => {
        if (!playerOpen) setPlayerOpen(!playerOpen);
        const audioPlayer = document.querySelector("#audio-player");
        const audioSrc = audioPlayer.querySelector("#audio-player-src");
        audioSrc.src = src;
        audioPlayer.load();
        setPlaying(true);
        setCurrentTrack({ 
          trackName,
          artist,
          src
        });
    };

    return (
        <PlayingContext.Provider value={{ 
        playing, 
        duration, 
        currentPosition,
        playerOpen, 
        currentTrack, 
        tracklist }}>
            <PlayingUpdateContext.Provider value={{ 
                setPlaying, 
                setPlayerOpen, 
                setClickedPosition, 
                setCurrentTrack, 
                setTracklist,
                setAudioSrc }}>
                {children}
            </PlayingUpdateContext.Provider>
        </PlayingContext.Provider>
    )
};

export default PlayingProvider;

