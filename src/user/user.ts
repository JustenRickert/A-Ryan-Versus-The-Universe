import Piece, { MShape, PShape } from '../game/piece'
import Coordinate from '../game/coordinate'

export const STARTING_PIECES = [new PShape(), new MShape(), new PShape()]

export default class User {
  pieces: Piece[]

  get piecesPlaced() {
    return this.pieces.filter(p => p.c)
  }

  constructor(pieces?: Piece[]) {
    this.pieces = pieces || []
    this.pieces[0].c = new Coordinate({ x: 0, y: 0 })
    this.pieces[1].c = new Coordinate({ x: 0, y: 1 })
    this.pieces[2].c = new Coordinate({ x: 0, y: 2 })
  }
}
