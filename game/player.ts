import Board from './board';
import Coordinate from './coordinate';
import Placement from './board';
import Piece from './piece';

const toNumber = Coordinate.toNumber;

export enum Team {
  White = 'white',
  Black = 'black'
}

/**
 * Class for methods related to the time. This will be a class to live within
 * the `Player` class.
 */
class TimeController {
  /**
   * `time` is going to be a finite thing. At every game step, the pieces time
   * value will go down 1 unit of time. Any order conflicts will be determined
   * by random.
   */
  time: Map<Piece, number>;

  constructor(pieces: Piece[]) {
    this.time = new Map();
    for (const p of pieces) {
      this.time.set(p, p.cd);
    }
  }

  // not tested
  decrement = () =>
    this.time.forEach((value, piece) => this.time.set(piece, value - 1));

  canMove = (p: Piece) => (this.time.get(p) ? this.time.get(p)! <= 0 : false);
}

export default class Player {
  team: Team;
  pieces: Piece[];
  time: TimeController;
  placements: Map<number, Piece>;

  get allCanMove() {
    return this.pieces.filter(p => this.time.canMove(p));
  }

  constructor(team: Team, pieces: Piece[]) {
    this.team = team;

    this.pieces = pieces;

    this.time = new TimeController(pieces);

    this.placements = new Map();
    for (const p of pieces) {
      this.placements.set(toNumber(p.c), p);
    }
  }

  /**
   * Moves piece if it's possible to move the piece.
   */
  move = (board: Board, piece: Piece, target: Coordinate) => {
    if (board.outbounds(target)) {
      throw new Error("Can't move there!");
    }

    const targetC = board.placeMap.get(toNumber(target));
    if (targetC) board.placeMap.delete(toNumber(target));
    board.placeMap.delete(toNumber(piece.c));

    piece.c = new Coordinate(target);
    board.placeMap.set(toNumber(target), piece);
  };
}
