import { sample } from 'lodash'
import { observable } from 'mobx'

export const BOARD_SIZE = 25

enum Direction {
  null = 'undefined',
  Left = 'LEFT',
  Right = 'RIGHT',
  Up = 'UP',
  Down = 'DOWN'
}

export function randDirection(): Direction {
  const s = sample(Object.keys(Direction))
  return s === undefined ? Direction.null : Direction[s]
}

export interface Coordinate {
  x: number
  y: number
}

interface CartesianCoordinateField {
  value: number[][]
  delta: Direction[][]
  move(point: Coordinate): void
  place(point: Coordinate, direction: Direction): void
}

export default class GameField implements CartesianCoordinateField {
  @observable value: number[][]
  @observable delta: Direction[][]

  constructor() {
    this.delta = new Array<Direction[]>(BOARD_SIZE).fill(
      new Array<Direction>(BOARD_SIZE).fill(Direction.null)
    )

    this.value = new Array<number[]>(BOARD_SIZE).fill(
      new Array<number>(BOARD_SIZE).fill(0)
    )
  }

  flip({ x, y }: Coordinate): void {
    const right = x + 1 >= BOARD_SIZE ? 0 : x + 1
    const left = x - 1 <= 0 ? BOARD_SIZE - 1 : x - 1
    const below = y + 1 >= BOARD_SIZE ? 0 : y + 1
    const above = y - 1 <= 0 ? BOARD_SIZE - 1 : y - 1

    this.value[x][y] = 0

    this.value[right][y] += 1
    this.value[left][y] += 1
    this.value[x][above] += 1
    this.value[x][below] += 1

    this.delta[right][y] = randDirection()
    this.delta[left][y] = randDirection()
    this.delta[x][above] = randDirection()
    this.delta[x][below] = randDirection()
  }

  move({ x, y }: Coordinate): void {
    const v = this.value[x][y]
    const d = this.delta[x][y]

    if (v === 0 || d === Direction.null) {
      return
    }

    const dX = d === Direction.Right ? 1 : d === Direction.Left ? -1 : 0
    const dY = d === Direction.Down ? 1 : d === Direction.Up ? -1 : 0
    const movX =
      x + dX >= BOARD_SIZE ? 0 : x + dX <= 0 ? BOARD_SIZE - 1 : x + dX
    const movY =
      y + dY >= BOARD_SIZE ? 0 : y + dY <= 0 ? BOARD_SIZE - 1 : y + dY

    this.value[movX][movY] += v
    this.value[x][y] = 0

    this.delta[movX][movY] = randDirection()
  }

  place({ x, y }: Coordinate, direction: Direction): void {
    this.delta[x][y] = direction
    this.value[x][y] += 1
  }
}
