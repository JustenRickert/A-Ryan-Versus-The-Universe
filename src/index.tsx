import * as React from 'react'
import * as ReactDOM from 'react-dom'

import MatchView from './component/App'
import Strategy from './strategy/strategy'
import Player, {
  Team,
  createFromUserObject as createPlayer,
  createEnemy
} from './game/player'
import Board from './game/board'
import User, { STARTING_PIECES } from './user/user'
import GameContext from './game/game'

import registerServiceWorker from './registerServiceWorker'

const user = new User(STARTING_PIECES)
const player = createPlayer(user, Team.White)
const enemy = createEnemy(STARTING_PIECES, Team.Black)
const game = new GameContext(board, player, enemy)
const strategy = new Strategy(game)

strategy.randomPossiblePlacements(Team.White)

setInterval(() => {
  ;[game.player, game.enemy].forEach((pl: Player) =>
    pl.pieces.forEach(p => {
      if (!p.canMove) {
        return
      }

      const move = strategy.randomMove(p)
      if (move) {
        pl.move(game.board, p, move)
        p.reset()
      }
    })
  )

  game.player.forward()
  game.enemy.forward()
  game.forward()
}, 1000)

ReactDOM.render(<MatchView game={game} />, document.getElementById(
  'root'
) as HTMLElement)
registerServiceWorker()
