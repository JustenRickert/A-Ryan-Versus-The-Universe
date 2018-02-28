import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { cloneDeep } from 'lodash'

import MatchView from './component/App'
import Player, { Team } from './game/player'
import User, { STARTING_PIECES } from './user/user'
import Game from './game/game'

import registerServiceWorker from './registerServiceWorker'

const user = new User(STARTING_PIECES)
const player = new Player(Team.White, cloneDeep(user.pieces))
const enemy = new Player(Team.Black, cloneDeep(STARTING_PIECES))
const game = new Game()
game.initializeBoard(player, enemy)

setInterval(() => {
  game.forward()
}, 100)

// setInterval(() => {
//   game.player.pieces.forEach(p => {
//     let move = game.strategy.value.randomMove(p)
//     if (move) {
//       game.player.move(game.board.value, p, move)
//     }
//   })

//   game.forward()
// }, 1000)

ReactDOM.render(<MatchView game={game} />, document.getElementById(
  'root'
) as HTMLElement)
registerServiceWorker()
