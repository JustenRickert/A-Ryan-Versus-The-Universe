import { action, observable, computed, toJS } from 'mobx';

import { BOARD_SIZE } from '../constant';

import { Maybe } from '../util/util';

import Coordinate from './coordinate';
import Piece from './piece';
import Game from './game';
import Player, { Team } from './player';

const toNumber = Coordinate.toNumber;
const equal = Coordinate.equal;

export type Placement = { piece: Piece; c: Coordinate };

export default class Board {
  size: { x: number; y: number };
  @observable white: Player;
  @observable black: Player;

  get pieces() {
    return [...this.white.pieces, ...this.black.pieces];
  }

  /**
   * `PlaceMap` elements are a number, and a `Piece` (corresponding to something
   * like chess pieces places on a chess board). They have to be number because
   * `mobx` doesn't take object for map `key` slot. Though there is an
   * isomorphism between the coordinate matrix and the set it maps to with
   * `toNumber`. i.e. `{x: 0, y:0} -> 0`, `{x:0, y:1} -> board length - 1`,
   * `...`, `{x: board length -1, y: board height - 1}`.
   */
  get placeMap() {
    const placeMap = new Map<number, Piece>();
    for (const p of this.pieces) {
      placeMap.set(toNumber(p.c!), p);
    }
    return placeMap;
  }

  @action
  places = () => {
    const places: Maybe<Piece>[] = new Array(this.size.x * this.size.y).fill(
      undefined
    );
    this.placeMap.forEach((p, index) => {
      if (p instanceof Piece) places[index] = p;
    });
    return places;
  };

  constructor(white: Player, black: Player, size: { x: number; y: number }) {
    this.size = size;
    this.white = white;
    this.black = black;

    /*
     * Error check.
     */
    this.pieces.forEach((p, i) => {
      for (const op of this.pieces.slice(i + 1, this.pieces.length)) {
        if (!p.c || !op.c)
          throw new Error(`
Pieces on the board must be given a coordinate!
No coordinate receieved for ${p} or ${op}!
`);
        else if (equal(p.c!, op.c!))
          throw new Error(`
Cannot make two placements in the same place!
p:  x: ${p.c.x}, y: ${p.c.y}
op: x: ${op.c.x}, y: ${op.c.y}
`);
        else if (
          p.c.x! < 0 ||
          p.c.y! < 0 ||
          p.c.x! >= this.size.x ||
          p.c.y! >= this.size.y
        )
          throw new Error(`
Cannot place outside of the board!
x: ${p.c.x}, y: ${p.c.y}
max: ${this.size.x}, ${this.size.y}
`);
      }
    });
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

  /**
   * Moves piece if it's possible to move the piece.
   */
  move = (piece: Piece, target: Coordinate) => {
    if (this.outbounds(target)) {
      throw new Error("Can't move there!");
    }

    const targetC = this.placeMap.get(toNumber(target));
    if (targetC) this.placeMap.delete(toNumber(target));
    this.placeMap.delete(toNumber(piece.c!));

    piece.c = new Coordinate(target);
    this.placeMap.set(toNumber(target), piece);
  };
}
