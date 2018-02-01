import { observable } from 'mobx'

import Player from './player'
import Board from './board'

export default class Game {
  boardSize = { x: 11, y: 11 }
  board: Board
  @observable time: number
  @observable player: Player
  @observable enemy: Player

  constructor(b: Board, p: Player, e: Player) {
    this.board = b
    this.player = p
    this.enemy = e
    this.time = 0
  }

  forward = () => this.time++
}
