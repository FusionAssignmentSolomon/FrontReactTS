import { GameStateEnum } from "../enums/GameStateEnum";

export interface GameState {
    board: string[][];
    currentPlayer: GameStateEnum.X | GameStateEnum.O;
    winner: GameStateEnum.X | GameStateEnum.O | GameStateEnum.DRAW | null;
  }