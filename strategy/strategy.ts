import { sample } from 'lodash';

import game from '../game/coordinate';
import Coordinate from '../game/coordinate';

class Strategy {
  static randomMove(coordinates: Coordinate[]) {
    sample(coordinates);
  }
}
