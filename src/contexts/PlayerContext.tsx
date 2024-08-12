import { createContext, ReactNode, useState, Dispatch, SetStateAction } from "react";
import { Player } from "../entities/Player";

interface IPlayerContext {
    player: Player;
    setPlayer: Dispatch<SetStateAction<Player>>;
}

export const PlayerContext = createContext<IPlayerContext | undefined>(undefined);

const createInitialPlayerState = (): Player => ({
    name: '',
    type: undefined
});

export default function PlayerProvider({ children }: { children: ReactNode }) {
    const [player, setPlayer] = useState<Player>(createInitialPlayerState());

    return (
        <PlayerContext.Provider value={{ player, setPlayer }}>
            {children}
        </PlayerContext.Provider>
    );
};
