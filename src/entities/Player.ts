import { GameStateEnum } from "../enums/GameStateEnum";

export interface Player {
    name: string;
    type?: GameStateEnum.X | GameStateEnum.O;
  }