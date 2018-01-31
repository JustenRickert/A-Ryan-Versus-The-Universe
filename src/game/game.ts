import { observable } from 'mobx'
import { clone } from 'lodash'

import Player from './player'
import Board from './board'

export default class GameContext {
  boardSize = { x: 11, y: 11 }
  board: Board
  @observable time: number
  @observable player: Player
  @observable enemy: Player

  constructor(b: Board, p: Player) {
    this.board = b
    this.player = p
    this.enemy = clone(p)
    this.time = 0
  }

  forward = () => this.time++
}
