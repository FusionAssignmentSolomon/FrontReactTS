import Board from "../components/Board";
import GameInfo from "../components/GameInfo";
import GameStateProvider from "../contexts/GameStateContext";
import PlayerProvider from "../contexts/PlayerContext";


export default function GamePage() {

    return <section className="tic-tac-toe">
        <GameStateProvider>
            <PlayerProvider>
                <GameInfo />
                <Board />
            </PlayerProvider>

        </GameStateProvider>
    </section>
};