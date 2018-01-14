import Board from './board';
import Coordinate from './coordinate';
import Piece from './piece';
import { Team } from './player';

const sum = (a: Coordinate, b: Coordinate) => Coordinate.plus(a, b);

abstract class Fighter extends Piece {
  constructor(symbol: string) {
    super(symbol);
  }

  attackables = (b: Board) => this.moves(b).filter(c => b.at(c) && b.at(c));
}

class MFighter extends Fighter {
  cd = 4;
  team: Team;

  constructor(team: Team, c: Coordinate) {
    super('M');
    this.team = team;
    this.c = c;
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
