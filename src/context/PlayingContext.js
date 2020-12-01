import { createContext, useContext } from "react";
import usePlayer from "src/hooks/usePlayer";

const PlayingContext = createContext();

export const usePlaying = () => useContext(PlayingContext);

const PlayingProvider = ({ children }) => {
    const { playing } = usePlayer({ initDuration: 0, initCurrentPosition: 0});

    return (
        <PlayingContext.Provider value={playing}>
            {children}
        </PlayingContext.Provider>
    )
};

export default PlayingProvider;

