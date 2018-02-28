import { sample } from 'lodash'

import { Maybe } from '../util/type'

import Board from './board'
import Coordinate from './coordinate'
import Piece, { Decision, DecisionKind, DecisionArgs } from './piece'
import { Team } from './player'

type Damage = number

const sum = (a: Coordinate, b: Coordinate) => Coordinate.plus(a, b)

export default abstract class Fighter extends Piece {
  static isFighter(p: Piece | Fighter): p is Fighter {
    return p.className === 'Fighter'
  }

  abstract behave(): void
  abstract board: Maybe<Board>

  constructor(symbol: string) {
    super(symbol)
  }

  attackables = (b: Board) =>
    this.moves(b).filter(c => b.at(c) && b.at(c)!.team !== this.team)
}

export class MFighter extends Fighter {
  timeout = 4
  behavior: Behavior
  hitpoints = 10
  damage: Damage
  team: Maybe<Team>
  board: Maybe<Board>

  constructor(board?: Board, team?: Team, c?: Coordinate) {
    super('M')
    this.className = Object.freeze('Fighter')
    this.board = board
    this.team = team
    this.c = c
    this.behavior = new WanderRandomly()
  }

  /**
     Sets the piece decision
  */
  behave() {
    if (!this.board)
      throw new Error('Cannot behave if the board is not initialized')
    const decision = this.behavior.action<WanderRandomlyArgs>({
      self: this,
      kind: this.behavior.decisionKind,
      c: undefined,
      b: this.board
    })
    this.decision = decision
  }

  moves(b: Board, coordinate?: Coordinate): Coordinate[] {
    if (!this.c) {
      throw new Error(
        `Piece ${this} can't move if it doesn't have a coordinate.`
      )
    }
    // prettier-ignore
    const moveableCoordinates = [
      { x:  1, y:  0 }, // Right
      { x: -1, y:  0 }, // Left
      { x:  0, y:  1 }, // Down
      { x:  0, y: -1 } // Up
    ]
      .map(c => sum(coordinate || this.c!, c))
      .filter(c => !b.at(c) && b.inbounds(c))
    return moveableCoordinates
  }
}

abstract class Behavior {
  abstract decisionKind: DecisionKind
  abstract condition<C extends DecisionArgs>(context: C): boolean
  abstract consequence<C extends DecisionArgs>(context: C): Decision
  action<C extends DecisionArgs>(context: C) {
    return this.condition(context)
      ? this.consequence(context)
      : new Decision(Object.assign(context, DecisionKind.Nothing))
  }
}

export interface WanderRandomlyArgs extends DecisionArgs {
  b: Board
}

class WanderRandomly extends Behavior {
  decisionKind = DecisionKind.Movement
  condition() {
    return true
  }
  // prettier-ignore
  consequence<C extends DecisionArgs>(ctx: C & WanderRandomlyArgs) {
    return ctx.self.assignMove(
      new Decision(Object.assign(ctx, {
        b:    Board,
        kind: ctx.self.canMove ? this.decisionKind : DecisionKind.Nothing,
        c:    sample(ctx.self.emptyMoves(ctx.b, ctx.self.c))
      }))
    )
  }
}

// class FindEnemy extends Behavior {
//   private closestEnemy = (self: Piece, game: Game): Piece => {
//     const opposingTeam = self.team === game.enemy.team
//       ? game.player.team
//       : game.enemy.team
//   }
//   private moveClosestTo = (piece: Piece): void => {} // TODO
//   condition = <P extends Piece>(p: P) => p.canMove
//   consequence = <S extends {p: Piece, b: Board}>({p, b}: S) => {
//     /** Should be
//      * 1. if in range to attack then attack, return
//      * 2. else move to the location that will best minimize the distance between
//      * itself and the enemy piece.
//      */
//   }
// }
