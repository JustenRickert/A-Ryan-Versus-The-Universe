import { sample } from 'lodash'

import Game from '../game/game'
import Piece from '../game/piece'
import { Team } from '../game/player'

export default class Strategy {
  game: Game

  constructor(game: Game) {
    this.game = game
  }

  randomMove = (p: Piece) => sample(p.emptyMoves(this.game.board))

  randomPossiblePlacements = (team: Team) => {
    const startingPositions =
      team === Team.Black
        ? this.game.board.blackStartingPositions
        : team === Team.White
          ? this.game.board.whiteStartingPositions
          : new Error(
              `Cannot get possible placements with a white or black team`
            )
    console.log(startingPositions)
  }
}
