import { Placement } from './board';
import Piece from './pieces';

export enum Team {
  White = 'white',
  Black = 'black'
}

class Strategy {}

class Player {
  team: Team;

  constructor(team: Team, pieces: Piece[]) {
    this.team = team;
  }
}
