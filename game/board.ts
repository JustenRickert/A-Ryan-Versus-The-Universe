import { observable } from 'mobx';

import { BOARD_SIZE } from '../constant';

class Coordinate {
  x: number;
  y: number;

  static equal(coord1: Coordinate, coord2: Coordinate): boolean {
    return coord1.x === coord2.x && coord1.y === coord2.y;
  }

  static toString(coordinate: Coordinate): string {
    return coordinate.x.toString() + ' ' + coordinate.y.toString();
  }

  static toNumber(coordinate: Coordinate): number {
    return BOARD_SIZE[0] * coordinate.y + coordinate.x;
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Piece {
  symbol: string;

  constructor(symbol: string) {
    this.symbol = symbol;
  }
}

export type Placement = { piece: Piece; coordinate: Coordinate };

export class Board {
  @observable placements: Map<number, Piece>;

  constructor(placements: Placement[]) {
    // error check
    placements.forEach((p, i) => {
      for (const op of placements.slice(i + 1, placements.length)) {
        if (Coordinate.equal(p.coordinate, op.coordinate))
          throw new Error('Cannot make two placements in the same place!');
        if (p.coordinate.x >= BOARD_SIZE[0] || p.coordinate.y >= BOARD_SIZE[1])
          throw new Error('Cannot place outside of the board!');
      }
    });

    this.placements = new Map<number, Piece>();

    // make placements
    for (const p of placements) {
      this.placements.set(Coordinate.toNumber(p.coordinate), p.piece);
    }
  }
}
