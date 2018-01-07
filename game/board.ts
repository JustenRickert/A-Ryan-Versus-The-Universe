import { observable, computed, toJS } from 'mobx';

import { boardConf } from '../constant';
import { Coordinate } from './coordinate';
import Piece, { MPiece } from './pieces';

/**
 * Board
 */

const toNumber = Coordinate.toNumber;
const equal = Coordinate.equal;
type Maybe<T> = T | undefined;

export type Placement = { piece: Piece; c: Coordinate };

export class Board {
  @observable placeMap: Map<number, Maybe<Piece>>;
  pieces: Piece[];

  private size: { x: number; y: number };

  constructor(pieces: Piece[]) {
    this.size = boardConf;

    /*
     * Error check.
     */
    pieces.forEach((p, i) => {
      for (const op of pieces.slice(i + 1, pieces.length)) {
        if (equal(p.c, op.c))
          throw new Error('Cannot make two placements in the same place!');
        if (
          p.c.x < 0 ||
          p.c.y < 0 ||
          p.c.x >= this.size.x ||
          p.c.y >= this.size.y
        )
          throw new Error('Cannot place outside of the board!');
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
    for (const p of pieces) {
      this.placeMap.set(toNumber(p.c), p);
    }
    this.pieces = Array.from(this.placeMap.values()).reduce(
      (acc, place) => (place !== undefined ? [...acc, place] : acc),
      new Array<Piece>()
    );
  }

  at = (c: Coordinate): Maybe<Piece> => this.placeMap.get(toNumber(c));

  inbounds = (c: Coordinate): boolean =>
    c.x >= 0 && c.y >= 0 && this.size.x > c.x && this.size.y > c.y;

  outbounds = (c: Coordinate): boolean => !this.inbounds(c);

  /**
   * Moves piece if it's possible to move the piece.
   */
  move = (piece: Piece, target: Coordinate) => {
    if (this.outbounds(target)) {
      throw new Error("Can't move there!");
    }

    const targetC = this.placeMap.get(toNumber(target));
    if (targetC) this.placeMap.delete(toNumber(target));
    this.placeMap.delete(toNumber(piece.c));

    piece.c = new Coordinate(target);
    this.placeMap.set(toNumber(target), piece);
  };
}
