import { observable } from 'mobx';

import Player from './player';
import Board from './board';

export default class GameContext {
  @observable boardSize = { x: 11, y: 11 };
  @observable board: Board;
  @observable white: Player;
  @observable black: Player;

  constructor(board: Board, white: Player, black: Player) {
    this.board = board;
    this.white = white;
    this.black = black;
  }
}

export const createContext = (board: Board, white: Player, black: Player) =>
  new GameContext(board, white, black);
