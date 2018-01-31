import Piece, { PShape, MShape } from '../game/piece'

const STARTING_PIECES = [new PShape(), new MShape(), new PShape()]

class User {
  pieces: Piece[]
  placements: Map<Piece>
  constructor(pieces: Piece[]) {
    this.pieces = pieces
  }
}

const user = new User(STARTING_PIECES)
export default user
