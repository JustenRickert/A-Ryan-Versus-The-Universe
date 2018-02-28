import { action, observable } from 'mobx'

import Coordinate from './coordinate'
import Board from './board'
import { Team } from './player'
import { Maybe } from '../util/type'

type Symbol = string
type Number = number
type Timeout = Number
type Cooldown = number

// prettier-ignore
export enum DecisionKind {
  Movement = 'movement',
  Attack   = 'attack',
  Nothing  = 'nothing'
}

export interface DecisionArgs {
  self: Piece
  kind: DecisionKind
  c: Maybe<Coordinate>
  op?: Piece
}

export class Decision {
  self: Piece
  kind: DecisionKind
  c: Maybe<Coordinate>
  op?: Piece
  private deferred: Function[] = []

  constructor(args: DecisionArgs) {
    const { self, kind, c, op } = args
    if (kind === DecisionKind.Attack) this.checkAttackDecisionKind(self, op)
    if (kind === DecisionKind.Movement) this.checkMovementDecisionKind(c)

    this.self = self
    this.kind = kind
    this.c = c
    this.op = op

    this.deferred.forEach(f => f())
  }

  private checkMovementDecisionKind = (c: Maybe<Coordinate>) => {
    if (!c) {
      this.deferred.push(() => (this.kind = DecisionKind.Nothing))
    }
  }

  private checkAttackDecisionKind = (self: Piece, op: Maybe<Piece>) => {
    if (!op || self.team === op.team) {
      throw new Error(`
Attack Decision constructor must have an argument for an opposing piece
`)
    }
  }
}

export enum PieceUpdateKind {
  C = 'c',
  CD = 'cd',
  Decision = 'decision'
}

export default abstract class Piece {
  static isPiece(piece: Piece): piece is Piece {
    return piece.className === 'Piece'
  }

  abstract team?: Team
  abstract hitpoints: number
  readonly symbol: Symbol
  readonly timeout: Timeout

  className: string
  @observable c: Maybe<Coordinate>
  @observable decision: Decision
  cd: Cooldown = 0

  @action
  update(key: PieceUpdateKind, value: Coordinate | Cooldown | Decision) {
    this[key] = value
  }

  forward() {
    if (this.cd > 0) this.update(PieceUpdateKind.CD, this.cd - 1)
  }

  reset() {
    this.update(PieceUpdateKind.CD, this.timeout)
  }

  get canMove() {
    return this.cd <= 0
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
    this.className = Object.freeze('Piece')
    this.symbol = symbol
    this.c = c || undefined
  }

  /**
   * Assigning a move means to intend to move to a given location. The actual
   * movement won't be done until the end of the frame. This is useful when
   * there are impossible movements like two allied pieces moving to the same
   * location, then not making the move already means there's time for
   * additional logic to happen before the end of the frame.
   */
  assignMove = (args: DecisionArgs) => (this.decision = new Decision(args))

  /**
   * Optional Coordinate is to find moves, if piece were at that coordinate
   */
  abstract moves(b: Board, c?: Coordinate): Coordinate[]
  emptyMoves = (b: Board, coordinate?: Coordinate) =>
    this.moves(b, coordinate).filter(c => !b.at(c))
}
