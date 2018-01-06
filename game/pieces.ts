import { Coordinate } from './coordinate';
import { Board } from './board';

const sum = (a: Coordinate, b: Coordinate) => Coordinate.plus(a, b);

type None = undefined;

export default abstract class Piece {
  /**
   * What it looks like on the page.
   */
  symbol: string;

  /**
   * A tuple { x: number, y: number } corresponding to the position of the
   * piece.
   */
  c: Coordinate;

  /**
   * Time it takes to rest between moves.
   */
  abstract timeout: number;

  /**
   * Collection of possible moves for the piece to make.
   */
  abstract moves: (b: Board) => Coordinate[];

  constructor(symbol: string) {
    this.symbol = symbol;
  }

  setCoordinate(c: Coordinate) {
    this.c = c;
  }
}

export class MShape extends Piece {
  c: Coordinate;
  timeout = 3;

  constructor(coordinate: Coordinate) {
    super('m');
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
      .filter(c => !b.at(c) && b.inbounds(c));
    return coords;
  };
}

export class PShape extends Piece {
  c: Coordinate;
  timeout = 4;

  constructor(coordinate: Coordinate) {
    super('p');
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
