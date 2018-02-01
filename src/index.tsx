import * as React from 'react'
import * as ReactDOM from 'react-dom'

import MatchView from './component/App'
import Strategy from './strategy/strategy'
import Player, { createFromUserObject } from './game/player'
import Board from './game/board'
import User, { STARTING_PIECES } from './user/user'
import GameContext from './game/game'

import registerServiceWorker from './registerServiceWorker'

const user = new User(STARTING_PIECES)
const player = createFromUserObject(user)
const enemy = createFromUserObject(user)
const board = new Board(player, enemy)
const game = new GameContext(board, player, enemy)
const strategy = new Strategy(game)

setInterval(() => {
  ;[game.white, game.black].forEach((player: Player) =>
    player.pieces.forEach(p => {
      if (!p.canMove) {
        return
      }

      const move = randomMove(p)
      if (move) {
        player.move(game.board, p, move)
        p.reset()
      }
    })
  )

  game.white.forward()
  game.black.forward()
  game.forward()
}, 1000)

ReactDOM.render(<MatchView />, document.getElementById('root') as HTMLElement)
registerServiceWorker()
