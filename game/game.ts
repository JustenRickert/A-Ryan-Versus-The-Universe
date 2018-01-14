import { observable } from 'mobx';

import { boardSize } from '../constant';

import Board from './board';
import Player, { Team } from './player';
import { PShape, MShape } from './piece';

export default class GameContext {
  boardSize: { x: number; y: number };
  @observable board: Board;
  @observable time: number;
  @observable black: Player;
  @observable white: Player;

  constructor(b: Board, wht: Player, blk: Player) {
    this.boardSize = boardSize;
    this.board = b;
    this.white = wht;
    this.black = blk;
    this.time = 0;
  }

  forward = () => this.time++;
}

export const createContext = (b: Board, wht: Player, blk: Player) =>
  new GameContext(b, wht, blk);

const white = new Player(Team.White, [
  new PShape(Team.White, { x: 0, y: 2 }),
  new MShape(Team.White, { x: 1, y: 2 }),
  new PShape(Team.White, { x: 5, y: 2 })
]);
const black = new Player(Team.Black, [
  new MShape(Team.Black, { x: 0, y: 0 }),
  new PShape(Team.Black, { x: 0, y: 1 }),
  new MShape(Team.Black, { x: 3, y: 2 })
]);
const board = new Board(white, black);

export const gameContext = observable(createContext(board, white, black));
