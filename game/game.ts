import { observable } from 'mobx';

import Player, { Team } from './player';
import { PShape, MShape } from './piece';
import Board from './board';

export default class GameContext {
  @observable boardSize = { x: 11, y: 11 };
  @observable board: Board;
  @observable white: Player;
  @observable black: Player;

  constructor(b: Board, wht: Player, blk: Player) {
    this.board = b;
    this.white = wht;
    this.black = blk;
  }
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

export const game = createContext(board, white, black);
