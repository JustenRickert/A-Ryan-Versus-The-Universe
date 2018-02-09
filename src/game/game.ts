import { action, observable } from 'mobx'

import Board from './board'

import { Maybe } from '../util/type'

export default class Game {
  boardSize = { x: 11, y: 11 }
  board: Maybe<Board>

  @observable time: number
  @observable isInitialized: boolean

  get player() {
    if (!this.board) {
      throw new Error('Need to initialize the board with a player.')
    }
    return this.board.player
  }

  get enemy() {
    if (!this.board) {
      throw new Error('Need to initialize the board with a player.')
    }
    return this.player
  }

  constructor() {
    this.time = 0
    this.isInitialized = false
  }

  @action
  initializeBoard = () => {
    this.board = new Board(this.player, this.enemy)
    this.isInitialized = true
  }

  forward = () => {
    this.time++
    ;[this.player, this.enemy].forEach(p => p.forward())
  }
}
