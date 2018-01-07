import { Coordinate } from './coordinate';
import { Board } from './board';

const sum = (a: Coordinate, b: Coordinate) => Coordinate.plus(a, b);

type None = undefined;

export default abstract class Piece {
  symbol: string;
  c: Coordinate;
  abstract moves: (b: Board) => Coordinate[];

  constructor(symbol: string) {
    this.symbol = symbol;
  }

  setCoordinate(c: Coordinate) {
    this.c = c;
  }
}

export class MPiece extends Piece {
  c: Coordinate;

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
    // if (!coords.length) return [this.c];
    return coords;
  };
}
