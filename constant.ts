import { Team } from './game/player';
import { PShape } from './game/piece';

export const BOARD_SIZE: { x: number; y: number } = { x: 9, y: 9 };

export const DEFAULT_PIECES = [
  new PShape(Team.White),
  new PShape(Team.White),
  new PShape(Team.White)
];
