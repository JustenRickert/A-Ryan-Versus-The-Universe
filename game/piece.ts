import Coordinate from './coordinate';
import Board from './board';
import { Team } from './player';

type Number = number;
type Cooldown = number;

const sum = (a: Coordinate, b: Coordinate) => Coordinate.plus(a, b);

export default abstract class Piece {
  /**
   * Collection of possible moves for the piece to make.
   */
  abstract moves: (b: Board) => Coordinate[];

  /**
   * The player that the piece belongs to.
   */
  abstract team: Team;

  /**
   * What it looks like on the page.
   */
  readonly symbol: string;

  /**
   * c: Coordinate. A tuple `{ x: number, y: number }` corresponding to the
   * position of the piece.
   */
  c: Coordinate;

  /**
   * Cooldown `cd`. Time `t`. Time it takes to rest between moves. Discrete
   * integers.
   */
  readonly cd: Cooldown;
  ti: Number;

  /**
   * Move piece forward in time. Set the movement grace period of the piece.
   */
  forward = () => (this.ti -= 1);
  reset = () => (this.ti = this.cd);

  /**
   * Test if the current time is extinguished. This is different from `hasMove`!
   */
  get canMove() {
    return this.ti <= 0;
  }

  constructor(symbol: string) {
    this.symbol = symbol;
  }

  /**
   * `this.canMove` should only handle `this.timeout` based checking.
   * `this.hasMove` cares more about the functionality of `moves` a piece will
   * have.
   */
  emptyMoves = (b: Board) => this.moves(b).filter(c => !b.at(c));
}

export class MShape extends Piece {
  c: Coordinate;
  cd = 3;
  team: Team;

  constructor(player: Team, coordinate: Coordinate) {
    super('m');
    this.team = player;
    this.c = coordinate;
  }

  moves = (b: Board): Coordinate[] => {
    const coords = [
      { x: 1, y: 0 }, // Right
      { x: -1, y: 0 }, // Left
      { x: 0, y: 1 }, // Down
      { x: 0, y: -1 } // Up
    ]
      .map(c => sum(this.c, c))
      .filter(c => b.inbounds(c));
    return coords;
  };
}

export class PShape extends Piece {
  c: Coordinate;
  cd = 4;
  team: Team;

  constructor(team: Team, coordinate: Coordinate) {
    super('p');
    this.team = team;
    this.c = coordinate;
  }

  moves = (b: Board): Coordinate[] => {
    const coords = [
      { x: 1, y: 1 }, // Right-Down
      { x: -1, y: -1 }, // Left-Up
      { x: -1, y: 1 }, // Left-Down
      { x: 1, y: -1 } // Right-Up
    ]
      .map(c => sum(this.c, c))
      .filter(c => !b.at(c) && b.inbounds(c));
    return coords;
  };
}
