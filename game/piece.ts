import { observable } from 'mobx';

import { Maybe } from '../util/util';

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
  abstract team: Maybe<Team>;

  readonly symbol: Symbol;
  readonly cd: Cooldown;

  @observable c: Maybe<Coordinate>;
  @observable ti: Timeout = 0;

  forward = () => (this.ti <= 0 ? (this.ti = 0) : (this.ti -= 1));

  reset = () => (this.ti = this.cd);

  /**
   * Use this function to satisfy `abtract moves`.
   * Something like this:
   * `moves = (b: Board) =>`
   *   `this._moves([{ x: 1, y: 0 }]).filter(m => !b.at(t) && b.inbounds(m))`
   */
  protected _moves = (coords: Coordinate[]) => {
    if (!this.c) {
      throw new Error(`The piece cannot move if it is on the board.`);
    }
    coords.map(c => sum(this.c!, c));
    return coords;
  };

  get canMove() {
    return this.ti <= 0;
  }

  get coordinateString() {
    return this.c
      ? `${this.symbol}{${this.c.x},${this.c.y}}`
      : `${this.symbol}`;
  }

  constructor(symbol: string) {
    this.symbol = symbol;
  }

  emptyMoves = (b: Board) => this.moves(b).filter(c => !b.at(c));
}

interface IPShape {
  team: Maybe<Team>;
  coordinate: Maybe<Coordinate>;
}

export class PShape extends Piece {
  cd = 4;
  team: Maybe<Team>;
  c: Maybe<Coordinate>;

  constructor(param: IPShape) {
    super('p');
    this.team = param.team;
    this.c = param.coordinate;
  }

  moves = (b: Board) =>
    this._moves([
      { x: 1, y: 1 }, // Right-Down
      { x: -1, y: -1 }, // Left-Up
      { x: -1, y: 1 }, // Left-Down
      { x: 1, y: -1 } // Right-Up
    ]).filter(c => !b.at(c) && b.inbounds(c));
}
