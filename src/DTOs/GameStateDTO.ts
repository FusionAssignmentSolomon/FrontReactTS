// dtos/PlayResponseDTO.ts
import { GameStateEnum } from '../enums/GameStateEnum';

export interface PlayResponseDTO {
    board: string[][];
    current_player: GameStateEnum.X | GameStateEnum.O;
    winner: GameStateEnum.X | GameStateEnum.O | GameStateEnum.DRAW | null;
}
