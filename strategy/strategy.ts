import { sample } from 'lodash';

import game

import Coordinate from './coordinate';

class Strategy {
  static randomMove(coordinates: Coordinate[]) {
    sample(coordinates);
  }
}
