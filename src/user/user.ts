import Piece from '../game/piece'
import { MFighter } from '../game/fighter'
import Coordinate from '../game/coordinate'

export const STARTING_PIECES = [new MFighter(), new MFighter(), new MFighter()]

export default class User {
  pieces: Piece[]

  get piecesPlaced() {
    return this.pieces.filter(p => p.c)
  }

  constructor(pieces?: Piece[]) {
    this.pieces = pieces || []
    this.pieces[0].c = new Coordinate({ x: 0, y: 0 })
    this.pieces[1].c = new Coordinate({ x: 0, y: 0 })
    this.pieces[2].c = new Coordinate({ x: 0, y: 0 })
  }
}
