import { Coordinate } from '../coordinate';
import { MShape } from '../pieces';

it('creates an MShape', () => {
  const mShape = new MShape(new Coordinate({ x: 1, y: 1 }));
  expect(mShape);
});
