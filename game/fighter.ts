import Board from './board';
import Coordinate from './coordinate';
import Piece from './piece';
import { Team } from './player';
import Upgrade from './upgrade';

const sum = (a: Coordinate, b: Coordinate) => Coordinate.plus(a, b);

export default abstract class Fighter extends Piece {
  abstract health: number;
  abstract damage: number;

  constructor(symbol: string) {
    super(symbol);
  }

  attackables = (b: Board) => this.moves(b).filter(c => b.at(c) && b.at(c));
}

class MFighter extends Fighter {
  health = 10;
  damage = 2;
  cd = 6;
  team: Team;
  experience: number;

  private _moveSet: Coordinate[] = [
    { x: 1, y: 0 }, // Right
    { x: -1, y: 0 }, // Left
    { x: 0, y: 1 }, // Down
    { x: 0, y: -1 } // Up
  ];

  private _attackMoveSet = this._moveSet;

  constructor(
    gameArgs?: { team: Team; c: Coordinate },
    instanceArgs?: { experience: number }
  ) {
    super('M');
    if (gameArgs) {
      this.team = gameArgs.team;
      this.c = gameArgs.c;
    }
    if (instanceArgs) {
      this.experience = instanceArgs.experience;
    }
  }

  moves = (b: Board) =>
    this._moves(this._moveSet).filter(c => !b.at(c) && b.inbounds(c));
}
