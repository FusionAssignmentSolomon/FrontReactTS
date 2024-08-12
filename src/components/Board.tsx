import { useContext, useEffect } from "react";
import { GameStateContext } from "../contexts/GameStateContext";
import { io } from 'socket.io-client';
import { PlayResponseDTO } from "../DTOs/GameStateDTO";
import { WebSocketState } from "../enums/WebSocketStatesEnum";
import { GameStateEnum } from "../enums/GameStateEnum";
import { PlayerContext } from "../contexts/PlayerContext";


const socket = io('http://localhost:5000'); // Flask server URL

export default function Board() {
    const gameStateConsumer = useContext(GameStateContext);
    const playerConsumer = useContext(PlayerContext);

    if (!gameStateConsumer) {
        throw new Error("Board must be used within a GameStateProvider");
    }

    if (!playerConsumer) {
        throw new Error("Board must be used within a playerConsumer");
    }

    const { gameState, setGameState } = gameStateConsumer;
    const { player, setPlayer } = playerConsumer;

    const renderSquare = (row: number, col: number) => (
        <button key={`${row}-${col}`} className="board__square" onClick={() => handleClick(row, col)}>
            {gameState.board[row][col]}
        </button>
    );

    const handleClick = (row: number, col: number) => {
        console.log('Clicked on board:', row, col);
        if (!gameState.board[row][col]) {
            console.log('socket emit');
            socket.emit(WebSocketState.MAKE_MOVE, { row, col });
        }
    };

    const clearBoard = () => {
        setGameState({
            board: [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ],
            currentPlayer: GameStateEnum.X,
            winner: null
        });
    };

    useEffect(() => {
        console.log("Setting up WebSocket listeners");
        socket.on(WebSocketState.UPDATE, (data: PlayResponseDTO) => {
            console.log("Updated:", data);
            setGameState({
                board: data.board,
                currentPlayer: data.current_player,
                winner: data.winner
            });
        });
        
        socket.on(WebSocketState.JOIN_RESPONSE, (data: any) => {
            setPlayer({
                ...player,
                type: data.player_type
            });
            console.log("Join REsponse:", player);
        });

        return () => {
            socket.off(WebSocketState.UPDATE);
        };
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlayer({ ...player,
            name: event.target.value}
        );
        console.log('player input', player);

    };

    const handleSubmit = () => {

        socket.emit(WebSocketState.JOIN, {name: player.name });
        console.log('player button', player);

    };

    return <div>
        { (player.name && player.type) ? 
        <div>
            <div>Hello: {player.name}, You are: {player.type}</div>
            <section className="board">
            {gameState.board.map((row, rowIndex) => (
                row.map((_, colIndex) => renderSquare(rowIndex, colIndex))
            ))}
            {gameState.winner ?
                <div style={{color:"white"}}>
                    {gameState.winner !== GameStateEnum.DRAW ? <p>{gameState.winner} is the winner</p> : <p>DRAW!</p>}
                    <button onClick={clearBoard}>Clear Board</button>
                </div> : null}
            
            </section>
        </div>
        :
        <section>
            <input type="text" placeholder="Type Your Name" onChange={handleInputChange}/>
            <button onClick={handleSubmit}>SUBMIT</button>
        </section>
        }
    </div>
};