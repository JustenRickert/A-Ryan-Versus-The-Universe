import { Maybe } from '../util/util';
import LocalStorage from '../util/localStorage';

import { DEFAULT_PIECES } from '../constant';

import Piece from '../game/piece';

import { load } from './userStorage';

export default class User {
  pieces: Piece[];

  constructor(u?: User, pieces?: Piece[]) {
    this.pieces = u ? u.pieces : undefined || pieces || DEFAULT_PIECES;
  }
}

const localUserData: Maybe<User> = load();

export const userContext = localUserData || new User();
