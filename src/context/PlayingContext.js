import { createContext, useContext, useState } from "react";
import usePlayer from "src/hooks/usePlayer";

const PlayingContext = createContext();
const PlayingUpdateContext = createContext();

export const usePlaying = () => useContext(PlayingContext);
export const useUpdatePlaying = () => useContext(PlayingUpdateContext);

const PlayingProvider = ({ children }) => {
    const [ currentTrack, setCurrentTrack ] = useState(null);
    const { 
        playing, 
        setPlaying, 
        duration, 
        currentPosition,
        setClickedPosition,
        playerOpen,
        setPlayerOpen } = usePlayer({ initDuration: 0, initCurrentPosition: 0 });

    return (
        <PlayingContext.Provider value={{ playing, duration, currentPosition, playerOpen, currentTrack }}>
            <PlayingUpdateContext.Provider value={{ setPlaying, setPlayerOpen, setClickedPosition, setCurrentTrack }}>
                {children}
            </PlayingUpdateContext.Provider>
        </PlayingContext.Provider>
    )
};

export default PlayingProvider;

