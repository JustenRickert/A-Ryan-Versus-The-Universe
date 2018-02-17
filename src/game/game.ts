import { action, computed, observable } from 'mobx'

import Board from './board'
import Player from './player'

import Strategy from '../strategy/strategy'
import { Check } from '../util/type'

export default class Game {
  boardSize = { x: 11, y: 11 }
  @observable board: Check<Board>
  strategy: Check<Strategy>

  @observable time: number
  @observable initialized: boolean

  @computed
  get player() {
    if (!this.board.initialized) {
      throw new Error('Need to initialize the board with a player.')
    }
    return this.board.value.player
  }

  @computed
  get enemy() {
    if (!this.board.initialized) {
      throw new Error('Need to initialize the board with a player.')
    }
    return this.board.value.enemy
  }

  constructor() {
    this.time = 0
    this.initialized = false
  }

  @action
  initializeBoard = (player: Player, enemy: Player) => {
    this.board = Object.assign(<Check<Board>>{
      value: new Board(player, enemy),
      initialized: true
    })

    this.strategy = Object.assign(<Check<Strategy>>{
      value: new Strategy(this),
      initialized: true
    })

    this.initialized = true
  }

  forward = () => {
    this.time++
    ;[this.player, this.enemy].forEach(p => p.forward())
  }

  @action
  resetBoard = () => {
    this.board.initialized = false
    this.strategy.initialized = false
    this.initialized = false
  }
}
