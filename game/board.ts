import { observable, computed, toJS } from 'mobx';

import { BOARD_SIZE } from '../constant';

import Piece, { MShape } from './pieces';

export class Coordinate {
  x: number;
  y: number;

  static equal(c1: Coordinate, c2: Coordinate): boolean {
    return c1.x === c2.x && c1.y === c2.y;
  }

  static toString(c: Coordinate): string {
    return c.x.toString() + ' ' + c.y.toString();
  }

  static toNumber(c: Coordinate): number {
    return BOARD_SIZE[1] * c.y + c.x;
  }

  static diff(c1: Coordinate, c2: Coordinate): Coordinate {
    const { x, y } = { x: c2.x - c1.x, y: c2.y - c1.y };
    return new Coordinate({ x, y });
  }

  static plus(c1: Coordinate, c2: Coordinate): Coordinate {
    return new Coordinate({
      x: c2.x + c1.x,
      y: c2.y + c1.y
    });
  }

  constructor({ x, y }: { x: number; y: number } | Coordinate) {
    this.x = x;
    this.y = y;
  }
}

/**
 * Board
 */

const toNumber = Coordinate.toNumber;
const equal = Coordinate.equal;

export type Placement = { piece: Piece; c: Coordinate };

export class Board {
  @observable placements: Map<number, Piece>;
  placementArray: Piece[];

  constructor(pieces: Piece[]) {
    // error check
    pieces.forEach((p, i) => {
      for (const op of pieces.slice(i + 1, pieces.length)) {
        if (equal(p.c, op.c))
          throw new Error('Cannot make two placements in the same place!');
        if (p.c.x >= BOARD_SIZE[0] || p.c.y >= BOARD_SIZE[1])
          throw new Error('Cannot place outside of the board!');
      }
    });

    /**
     * Placements are a number (which corresponds to a Coordinate), and a Piece
     * (corresponding to something like a chess piece on a chess board). They
     * have to be number because `mobx` doesn't take object for map `key` slot.
     */
    this.placements = new Map<number, Piece>();
    for (const p of pieces) {
      this.placements.set(toNumber(p.c), p);
    }
    this.placementArray = Array.from(this.placements.values());
  }

  at(c: Coordinate): Piece | undefined {
    return this.placements.get(toNumber(c));
  }

  inbounds(c: Coordinate): boolean {
    return BOARD_SIZE[0] > c.y && c.y >= 0 && BOARD_SIZE[1] > c.x && c.x >= 0;
  }

  outOfBoundsAt(c: Coordinate): boolean {
    return !this.inbounds(c);
  }

  /**
   * Moves piece if it's possible to move the piece.
   */
  move = (piece: Piece, target: Coordinate) => {
    if (this.outOfBoundsAt(target)) {
      throw new Error("Can't move there!");
    }
    this.placements.set(toNumber(target), piece);

    const targetC = this.placements.get(toNumber(target));
    targetC ? this.placements.delete(toNumber(target)) : undefined;

    piece.c = new Coordinate(target);
    this.placements.set(toNumber(target), piece);
  };
}
