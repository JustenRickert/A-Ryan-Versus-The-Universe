import { action, computed, observable } from 'mobx'

import Board from './board'
import Player from './player'
import Fighter from './fighter'

import Strategy from '../strategy/strategy'
import { Checked } from '../util/type'

export default class Game {
  boardSize = { x: 11, y: 11 }
  @observable cBoard: Checked<Board>
  strategy: Checked<Strategy>

  @observable time: number
  @observable initialized: boolean

  get board() {
    return this.cBoard.value
  }

  @computed
  get player() {
    if (!this.cBoard.initialized) {
      throw new Error('Need to initialize the board with a player.')
    }
    return this.cBoard.value.player
  }

  @computed
  get enemy() {
    if (!this.cBoard.initialized) {
      throw new Error('Need to initialize the board with a player.')
    }
    return this.cBoard.value.enemy
  }

  constructor() {
    this.time = 0
    this.initialized = false
  }

  @action
  initializeBoard = (player: Player, enemy: Player) => {
    this.cBoard = <Checked<Board>>{
      value: new Board(player, enemy),
      initialized: true
    }
    ;[this.player, this.enemy].forEach(pl => {
      pl.pieces
        .map(p => (p.team = pl.team) && p)
        .filter(Fighter.isFighter)
        .forEach(f => (f.board = this.cBoard.value))
    })

    console.log(this.player.pieces.filter(Fighter.isFighter))

    this.strategy = <Checked<Strategy>>{
      value: new Strategy(this),
      initialized: true
    }

    this.initialized = true
  }

  forward = () => {
    this.time++
    this.cBoard.value.forward()
    const player = this.time % 2 ? this.player : this.enemy
    player.pieces.filter(Fighter.isFighter).forEach(f => f.behave())
    player.act()
  }

  @action
  resetBoard = () => {
    this.cBoard.initialized = false
    this.strategy.initialized = false
    this.initialized = false
  }
}
