import Piece, { PShape, MShape } from '../game/piece'

export const STARTING_PIECES = [new PShape(), new MShape(), new PShape()]

export default class User {
  pieces: Piece[]

  get piecesPlaced() {
    return this.pieces.filter(p => p.c)
  }

  constructor(pieces: Piece[]) {
    this.pieces = pieces
  }
}
