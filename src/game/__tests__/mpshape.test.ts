import Coordinate from '../coordinate'
import { Team } from '../player'
import { MShape } from '../piece'

it('creates an MShape', () => {
  const mShape = new MShape(Team.White, new Coordinate({ x: 1, y: 1 }))
  expect(mShape)
})
