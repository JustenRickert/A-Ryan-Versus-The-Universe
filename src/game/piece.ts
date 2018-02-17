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
    if (DecisionKind.Attack === kind) this.checkAttackDecisionKind(self, op)
    if (DecisionKind.Movement === kind) this.checkMovementDecisionKind(c)

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

export default abstract class Piece {
  abstract team?: Team
  abstract hitpoints: number
  readonly symbol: Symbol
  readonly timeout: Timeout

  @observable c: Maybe<Coordinate>
  cd: Cooldown = 0
  decision: Decision

  // prettier-ignore
  @action
  update = (
    key:   'c'        | 'cd'     | 'decision',
    value: Coordinate | Cooldown | Decision
  ) => (this[key] = value)

  forward = () => {
    this.cd <= 0 ? (this.cd = 0) : (this.cd -= 1)
  }

  reset = () => {
    this.cd = this.timeout
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
    this.symbol = symbol
    this.c = c || undefined
  }

  /**
     Deciding a move means to intend to move to a given location. The actual
     movement won't be done until the end of the frame. This is useful when
     there are impossible movements like two allied pieces moving to the same
     location, then not making the move already means there's time for
     additional logic to happen before the end of the frame.
   */
  decideMove = (args: DecisionArgs) => (this.decision = new Decision(args))

  abstract moves: (b: Board) => Coordinate[]
  emptyMoves = (b: Board) => this.moves(b).filter(c => !b.at(c))
}
