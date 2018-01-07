import { Coordinate } from './coordinate';
import { Placement } from './board';
import Piece from './pieces';

const toNumber = Coordinate.toNumber;

export enum Team {
  White = 'white',
  Black = 'black'
}

class TimeController {
  /**
   * Time is going to be a finite thing. At every game step, the pieces time
   * value will go down 1 unit of time. Any conflicts in order will be
   * determined by random.
   */
  time: Map<Piece, number>;

  constructor(pieces: Piece[]) {
    for (const p of pieces) {
      this.time.set(p, p.timeout);
    }
  }

  // not tested
  decrement = () =>
    this.time.forEach((value, piece) => this.time.set(piece, value - 1));
}

export default class Player {
  team: Team;
  pieces: Piece[];
  timeController: TimeController;
  placements: Map<number, Piece>;

  constructor(team: Team, pieces: Piece[]) {
    this.team = team;
    this.pieces = pieces;
    this.timeController = new TimeController(pieces);
    this.placements = new Map();

    for (const p of pieces) {
      this.placements.set(toNumber(p.c), p);
    }
  }

  run = () => {
    this.timeController.decrement();
  };
}
