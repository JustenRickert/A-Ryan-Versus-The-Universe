import Board from './board';
import Coordinate from './coordinate';
import Placement from './board';
import Piece from './piece';

const toNumber = Coordinate.toNumber;

export enum Team {
  White = 'white',
  Black = 'black'
}

export default class Player {
  team: Team;
  pieces: Piece[];
  placements: Map<number, Piece>;

  get allCanMove() {
    return this.pieces.filter(p => p.canMove);
  }

  constructor(team: Team, pieces: Piece[]) {
    this.team = team;

    this.pieces = pieces;

    this.placements = new Map();
    for (const p of pieces) {
      this.placements.set(toNumber(p.c), p);
    }
  }

  forward = () => this.pieces.forEach(p => p.forward());

  /**
   * Moves piece if it's possible to move the piece.
   */
  move = (board: Board, piece: Piece, target: Coordinate) => {
    if (board.outbounds(target)) {
      throw new Error("Can't move there!");
    }

    const targetC = board.placeMap.get(toNumber(target));
    if (targetC) board.placeMap.delete(toNumber(target));
    board.placeMap.delete(toNumber(piece.c));

    piece.c = new Coordinate(target);
    board.placeMap.set(toNumber(target), piece);
  };
}
