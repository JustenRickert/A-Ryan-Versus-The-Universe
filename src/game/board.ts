import { observable } from 'mobx';

import { boardConf } from '../constant';
import Coordinate from './coordinate';
import Piece from './piece';
import Player from './player';

const toNumber = Coordinate.toNumber;
const equal = Coordinate.equal;
type Maybe<T> = T | undefined;

export type Placement = { piece: Piece; c: Coordinate };

export default class Board {
  @observable white: Player;
  @observable black: Player;

  /**
   * Placemap is how the board gets updated. It's an observable with a
   * React.Component watching it.
   */
  @observable placeMap: Map<number, Maybe<Piece>>;
  get pieces() {
    return [...this.white.pieces, ...this.black.pieces];
  }

  private size: { x: number; y: number };

  constructor(white: Player, black: Player) {
    this.size = boardConf;
    this.white = white;
    this.black = black;

    /*
     * Error check.
     */
    this.pieces.forEach((p, i) => {
      for (const op of this.pieces.slice(i + 1, this.pieces.length)) {
        if (equal(p.c, op.c))
          throw new Error(`Cannot make two placements in the same place!
p:  x: ${p.c.x}, y: ${p.c.y}
op: x: ${op.c.x}, y: ${op.c.y}
`);
        if (
          p.c.x < 0 ||
          p.c.y < 0 ||
          p.c.x >= this.size.x ||
          p.c.y >= this.size.y
        )
          throw new Error(`Cannot place outside of the board!
x: ${p.c.x}, y: ${p.c.y}
max: ${this.size.x}, ${this.size.y}
`);
      }
    });

    /**
     * `Placements` are a number, and a `Piece` (corresponding to something like
     * chess pieces places on a chess board). They have to be number because
     * `mobx` doesn't take object for map `key` slot. Though there is an
     * isomorphism between the coordinate matrix and the set it maps to with
     * `toNumber`. i.e. `{x: 0, y:0} -> 0`, `{x:0, y:1} -> board length - 1`,
     * `...`, `{x: board length -1, y: board height - 1}`.
     */
    this.placeMap = new Map<number, Piece>();
    for (const p of this.pieces) {
      this.placeMap.set(toNumber(p.c), p);
    }
  }

  at = (c: Coordinate): Maybe<Piece> => this.placeMap.get(toNumber(c));

  inbounds = (c: Coordinate): boolean =>
    c.x >= 0 && c.y >= 0 && this.size.x > c.x && this.size.y > c.y;

  outbounds = (c: Coordinate): boolean => !this.inbounds(c);

  forward = () => {
    this.white.forward();
    this.black.forward();
  };

  movablePieces = () => [...this.white.allCanMove, ...this.black.allCanMove];
}
