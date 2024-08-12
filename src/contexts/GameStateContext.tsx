import { createContext, ReactNode, useState, Dispatch, SetStateAction } from "react";
import { GameStateEnum } from "../enums/GameStateEnum";
import { GameState } from "../entities/GameState";

interface IGameStateContext {
    gameState: GameState;
    setGameState: Dispatch<SetStateAction<GameState>>;
}

export const GameStateContext = createContext<IGameStateContext | undefined>(undefined);

const createInitialGameState = (): GameState => ({
    board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],
    currentPlayer: GameStateEnum.X,
    winner: null
});

export default function GameStateProvider({ children }: { children: ReactNode }) {
    const [gameState, setGameState] = useState<GameState>(createInitialGameState());

    return (
        <GameStateContext.Provider value={{ gameState, setGameState }}>
            {children}
        </GameStateContext.Provider>
    );
};
