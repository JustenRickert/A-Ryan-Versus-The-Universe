import { Maybe } from '../util/util';
import LocalStorage from '../util/localStorage';

import Piece from '../game/piece';

import User, { userContext } from './user';

export const save = () =>
  localStorage.setItem('userStorage', JSON.stringify(userContext));

export const load = (): Maybe<User> => {
  const data = localStorage.getItem('userStorage');
  if (!data) {
    return undefined;
  } else {
    return new User(JSON.parse(data));
  }
};
