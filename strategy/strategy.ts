import { sample } from 'lodash';

import Piece from '../game/piece';
import Board from '../game/board';

class Strategy {
  randomMove = (b: Board, p: Piece) => sample(p.emptyMoves(b));
}

const strategy = new Strategy();

export default strategy;
