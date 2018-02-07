import { action, observable } from 'mobx'

import Player from './player'
import Board from './board'

import { Maybe } from '../util/type'

export default class Game {
  boardSize = { x: 11, y: 11 }
  board: Maybe<Board>

  @observable time: number
  @observable player: Player
  @observable enemy: Player
  @observable isInitialized: boolean

  constructor(p: Player, e: Player) {
    this.player = p
    this.enemy = e
    this.time = 0
  }

  @action
  initializeBoard = () => {
    this.board = new Board(this.player, this.enemy)
    this.isInitialized = true
  }

  forward = () => this.time++
}
