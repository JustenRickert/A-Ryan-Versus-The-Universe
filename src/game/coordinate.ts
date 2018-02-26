import { boardConf } from '../constant'

export default class Coordinate {
  x: number
  y: number

  static equal(c1: Coordinate, c2: Coordinate): boolean {
    return c1.x === c2.x && c1.y === c2.y
  }

  static toString(c: Coordinate): string {
    return c.x.toString() + ' ' + c.y.toString()
  }

  static toNumber(c: Coordinate): number {
    return boardConf.x * c.y + c.x
  }

  static toCoordinate(n: number): Coordinate {
    const y = n % boardConf.x
    const x = Math.floor(n / boardConf.y)
    return { x, y }
  }

  static diff(c1: Coordinate, c2: Coordinate): Coordinate {
    const { x, y } = { x: c2.x - c1.x, y: c2.y - c1.y }
    return new Coordinate({ x, y })
  }

  static plus(c1: Coordinate, c2: Coordinate): Coordinate {
    return new Coordinate({
      x: c2.x + c1.x,
      y: c2.y + c1.y
    })
  }

  static norm(rank: 1 | 2) {
    return (c1: Coordinate, c2: Coordinate) => {
      switch (rank) {
        case 1:
          return Math.abs(c2.y - c1.y) + Math.abs(c2.x - c1.x)
        case 2:
          return Math.sqrt(c2.y - c1.y) + Math.sqrt(c2.x - c1.x)
      }
    }
  }

  constructor({ x, y }: Coordinate) {
    this.x = x
    this.y = y
  }
}
