import Coordinate from './coordinate'
import Board from './board'
import { Team } from './player'
import { Maybe } from '../util/type'

type Symbol = string
type Number = number
type Timeout = Number
type Cooldown = number

const sum = (a: Coordinate, b: Coordinate) => Coordinate.plus(a, b)

export default abstract class Piece {
  abstract team: Team
  abstract hitpoints: number
  readonly symbol: Symbol
  readonly cd: Cooldown

  c: Maybe<Coordinate>
  ti: Timeout = 0

  forward = () => {
    this.ti <= 0 ? (this.ti = 0) : (this.ti -= 1)
  }

  reset = () => {
    this.ti = this.cd
  }

  get canMove() {
    return this.ti <= 0
  }

  get coordinateString() {
    if (!this.c) {
      throw new Error(
        `Piece ${this} can't have coordinateString if it doesn't have a coordinate.`
      )
    }
    return `${this.symbol}{${this.c!.x},${this.c!.y}}`
  }

  constructor(symbol: string, c?: Coordinate) {
    this.symbol = symbol
    this.c = c || undefined
  }

  abstract moves: (b: Board) => Coordinate[]
  emptyMoves = (b: Board) => this.moves(b).filter(c => !b.at(c))
}

export class MShape extends Piece {
  c: Maybe<Coordinate>
  cd = 3
  team: Team

  constructor(coordinate?: Coordinate, team?: Team) {
    super('m')
    this.team = team || Team.None
    this.c = coordinate || undefined
  }

  moves = (b: Board): Coordinate[] => {
    if (!this.c) {
      throw new Error(
        `Piece ${this} can't move if it doesn't have a coordinate.`
      )
    }
    const coords = [
      { x: 1, y: 0 }, // Right
      { x: -1, y: 0 }, // Left
      { x: 0, y: 1 }, // Down
      { x: 0, y: -1 } // Up
    ]
      .map(c => sum(this.c!, c))
      .filter(c => b.inbounds(c))
    return coords
  }
}

export class PShape extends Piece {
  c: Maybe<Coordinate>
  cd = 4
  team: Team

  constructor(coordinate?: Coordinate, team?: Team) {
    super('p')
    this.team = team || Team.None
    this.c = coordinate
  }

  moves = (b: Board): Coordinate[] => {
    if (!this.c) {
      throw new Error(
        `Piece ${this} can't move if it doesn't have a coordinate.`
      )
    }
    const coords = [
      { x: 1, y: 1 }, // Right-Down
      { x: -1, y: -1 }, // Left-Up
      { x: -1, y: 1 }, // Left-Down
      { x: 1, y: -1 } // Right-Up
    ]
      .map(c => sum(this.c!, c))
      .filter(c => !b.at(c) && b.inbounds(c))
    return coords
  }
}
