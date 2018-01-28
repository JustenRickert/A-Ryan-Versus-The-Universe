import Coordinate from './coordinate';
import Board from './board';
import { Team } from './player';

type Symbol = string;
type Number = number;
type Timeout = Number;
type Cooldown = number;

const sum = (a: Coordinate, b: Coordinate) => Coordinate.plus(a, b);

export default abstract class Piece {
  abstract moves: (b: Board) => Coordinate[];
  abstract team: Team;

  readonly symbol: Symbol;
  readonly cd: Cooldown;

  c: Coordinate;
  ti: Timeout = 0;

  forward = () => {
    this.ti <= 0 ? (this.ti = 0) : (this.ti -= 1);
  };

  reset = () => {
    this.ti = this.cd;
  };

  get canMove() {
    return this.ti <= 0;
  }

  get coordinateString() {
    return `${this.symbol}{${this.c.x},${this.c.y}}`;
  }

  constructor(symbol: string) {
    this.symbol = symbol;
  }

  emptyMoves = (b: Board) => this.moves(b).filter(c => !b.at(c));
}

export class MShape extends Piece {
  c: Coordinate;
  cd = 3;
  team: Team;

  constructor(team: Team, coordinate: Coordinate) {
    super('m');
    this.team = team;
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
