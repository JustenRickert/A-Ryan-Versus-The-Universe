import { sample } from 'lodash'

import { Maybe } from '../util/type'

import Board from './board'
import Coordinate from './coordinate'
import Piece, { Decision, DecisionKind, DecisionArgs } from './piece'
import { Team } from './player'

type Damage = number

const sum = (a: Coordinate, b: Coordinate) => Coordinate.plus(a, b)

abstract class Fighter extends Piece {
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
    this.behavior.action<WanderRandomlyArgs>({
      self: this,
      kind: this.behavior.decisionKind,
      c: undefined,
      b: this.board
    })
  }

  moves = (b: Board): Coordinate[] => {
    if (!this.c) {
      throw new Error(
        `Piece ${this} can't move if it doesn't have a coordinate.`
      )
    }
    // prettier-ignore
    const coords = [
      { x:  1, y:  0 }, // Right
      { x: -1, y:  0 }, // Left
      { x:  0, y:  1 }, // Down
      { x:  0, y: -1 } // Up
    ]
      .map(c => sum(this.c!, c))
      .filter(c => !b.at(c) && b.inbounds(c))
    return coords
  }
}

abstract class Behavior {
  abstract decisionKind: DecisionKind
  abstract condition: <C extends DecisionArgs>(context: C) => boolean
  abstract consequence: <C extends DecisionArgs>(context: C) => Decision

  action = <C extends DecisionArgs>(context: C) =>
    this.condition(context)
      ? this.consequence(context)
      : new Decision(Object.assign(context, DecisionKind.Nothing))
}

export interface WanderRandomlyArgs extends DecisionArgs {
  b: Board
}

class WanderRandomly extends Behavior {
  decisionKind = DecisionKind.Movement
  condition = () => true
  // prettier-ignore
  consequence = <C>(ctx: C & WanderRandomlyArgs) => ctx.self.decideMove(
    new Decision(Object.assign(ctx, {
      b:    Board,
      kind: this.decisionKind,
      c:    sample(ctx.self.emptyMoves(ctx.b))
    }))
  )
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
