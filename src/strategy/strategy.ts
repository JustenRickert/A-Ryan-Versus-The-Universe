import { sample } from 'lodash'

import { gameContext } from '../game/game'
import Piece from '../game/piece'

const board = gameContext.board

class Strategy {
  randomMove = (p: Piece) => sample(p.emptyMoves(board))
}

const strategy = new Strategy()

export default strategy
