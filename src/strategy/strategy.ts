import { sample } from 'lodash'

import Game from '../game/game'
import Piece from '../game/piece'

export default class Strategy {
  game: Game

  constructor(game: Game) {
    this.game = game
  }

  randomMove = (p: Piece) => sample(p.emptyMoves(this.game.board))
}
