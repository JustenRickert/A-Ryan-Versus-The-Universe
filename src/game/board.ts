import { action, computed, observable, observe } from 'mobx'
import { sample, differenceBy } from 'lodash'

import { boardConf } from '../constant'
import Coordinate from './coordinate'
import Piece from './piece'
import Player, { Team } from './player'
import { Maybe } from '../util/type'

const toNumber = Coordinate.toNumber
const equal = Coordinate.equal

export type Placement = { piece: Piece; c: Coordinate }
export type PlayerKey = 'player' | 'enemy'

const whitePossibleStartingPositions = (size: Coordinate) => {
  const locations = new Array<Coordinate>()
  for (let i = 0; i < 2; i++)
    for (let j = 0; j < size.y; j++) locations.push({ x: i, y: j })
  return locations
}

const blackPossibleStartingPositions = (size: Coordinate) => {
  const locations = new Array<{ x: number; y: number }>()
  for (let i = size.x - 2; i < size.x; i++)
    for (let j = 0; j < size.y; j++) locations.push({ x: i, y: j })
  return locations
}

export default class Board {
  @observable player: Player
  @observable enemy: Player
  size: Coordinate

  /**
   * Placemap is how the board gets updated. It's an observable with a
   * React.Component watching it.
   */
  @observable placeMap: Map<number, Maybe<Piece>>

  watchPlaceMap = (pieces: Piece[]) =>
    observe(pieces, change => {
      console.log('change', change)
    })

  @computed
  get pieces() {
    return [...this.player.pieces, ...this.enemy.pieces]
  }

  @computed
  get piecesNotPlaced() {
    return this.pieces.filter(p => !p.c)
  }

  constructor(white: Player, black: Player) {
    this.size = boardConf
    this.player = white
    this.enemy = black

    this.randomlyPlacePieces('player')
    this.randomlyPlacePieces('enemy')

    this.placeMap = new Map<number, Piece>()
    for (const p of this.pieces.filter(p => !!p.c))
      this.placeMap.set(toNumber(p.c!), p)
    this.watchPieces()
  }

  private watchPieces = () =>
    [this.player, this.enemy].forEach(player =>
      player.pieces.forEach(piece =>
        observe(piece, change => {
          this.placeMap.delete(toNumber(change.oldValue as Coordinate))
          this.placeMap.set(toNumber(change.newValue as Coordinate), piece)
        })
      )
    )

  at = (c: Coordinate): Maybe<Piece> => this.placeMap.get(toNumber(c))

  inbounds = (c: Coordinate): boolean =>
    c.x >= 0 && c.y >= 0 && this.size.x > c.x && this.size.y > c.y

  outbounds = (c: Coordinate): boolean => !this.inbounds(c)

  @action
  forward = () => {
    this.player.forward()
    this.enemy.forward()
  }

  movablePieces = () => [...this.player.allCanMove, ...this.enemy.allCanMove]

  @action
  randomlyPlacePieces = (playerKey: PlayerKey) => {
    const places =
      this[playerKey].team === Team.White
        ? this.whitePossibleStartingPositions
        : this.blackPossibleStartingPositions
    console.log(this[playerKey].pieces)
    places.reduce((placed: Coordinate[], val) => {
      const piece = sample(this[playerKey].pieces.filter(p => !!p.c))
      const place = sample(differenceBy(places, placed, plc => toNumber(plc)))
      if (piece && place) {
        piece.c = place
        placed.push(place)
      }
      return placed
    }, new Array<Coordinate>())
  }

  get whitePossibleStartingPositions() {
    return whitePossibleStartingPositions(this.size)
  }

  get blackPossibleStartingPositions() {
    return blackPossibleStartingPositions(this.size)
  }

  errorCheckPlacements() {
    /*
     * Error for all placements made
     */
    if (this.pieces.filter(p => !!p.c).length === 0) {
      throw new Error(`
There can't be no placements made!
`)
    } else if (this.piecesNotPlaced.length) {
      throw new Error(`
All pieces need to be placed!
`)
    }

    /*
     * Error check for a placement made twice.
     */
    this.pieces.filter(p => !!p.c).forEach((p, i) => {
      for (const op of this.pieces
        .filter(p => !!p.c)
        .slice(i + 1, this.pieces.filter(p => !!p.c).length)) {
        if (equal(p.c!, op.c!))
          throw new Error(`
Cannot make two placements in the same place!
p:  x: ${p.c!.x}, y: ${p.c!.y}
op: x: ${op.c!.x}, y: ${op.c!.y}
`)
        else if (
          p.c!.x < 0 ||
          p.c!.y < 0 ||
          p.c!.x >= this.size.x ||
          p.c!.y >= this.size.y
        )
          throw new Error(`
Cannot place outside of the board!
x: ${p.c!.x}, y: ${p.c!.y}
max: ${this.size.x}, ${this.size.y}
`)
      }
    })
  }
}
