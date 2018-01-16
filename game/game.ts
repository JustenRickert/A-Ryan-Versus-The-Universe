import { observable } from 'mobx';

import { BOARD_SIZE } from '../constant';

import Board from './board';
import Player, { Team } from './player';

export default class GameContext {
  boardSize: { x: number; y: number };
  @observable board: Board;
  @observable time: number;
  @observable black: Player;
  @observable white: Player;

  constructor(b: Board, wht: Player, blk: Player) {
    this.boardSize = BOARD_SIZE;
    this.board = b;
    this.white = wht;
    this.black = blk;
    this.time = 0;
  }

  forward = () => this.time++;
}

export const createGameContext = (b: Board, wht: Player, blk: Player) =>
  new GameContext(b, wht, blk);
