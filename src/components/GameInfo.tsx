import { useContext } from "react";
import { GameStateContext } from "../contexts/GameStateContext";


export default function GameInfo() {
    const gameStateConsumer = useContext(GameStateContext);

    if (!gameStateConsumer) {
        throw new Error("Board must be used within a GameStateProvider");
    }

    const { gameState } = gameStateConsumer;

    return <div className="margin-bottom-meduim">
        <div>{gameState.currentPlayer} is to play</div>
    </div>
};