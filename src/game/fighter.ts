import * as R from 'ramda'

import Board from './board'
import Coordinate from './coordinate'
import Game from './game'
import Piece from './piece'
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
  cd = 4
  team: Team
  behavior: Behavior
  damage: Damage

  constructor(team: Team, c: Coordinate) {
    super('M')
    this.team = team
    this.c = c
    this.behaviors = [WanderRandomly, FindEnemy]
  }

  maybeBehave() {
    const { } = this.behaviors
    R.cond([
      [this.behavior],

    ])
  }

  attack = (piece: Piece) => {
    piece.
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
  abstract condition: <C>(context: C) => boolean
  abstract consequence: <C>(context: C) => void
  action = (game: Game) => this.condition(game) ? this.consequence(game) : () => {}
}

class WanderRandomly extends Behavior {
}

class FindEnemy extends Behavior {
  closestEnemy = (piece: Piece, game: Game): Piece => {
    const c = piece.c!
  } // TODO
  moveClosestTo = (piece: Piece): void => {} // TODO
  condition = <P extends Piece>(p: P) => p.canMove
  consequence = <S extends {p: Piece, b: Board}>({p, b}: S) => {}
}
