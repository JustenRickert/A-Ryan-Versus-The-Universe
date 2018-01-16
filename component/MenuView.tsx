import * as React from 'react';

import Piece from '../game/piece';
import { PiecesList, LogCard } from './Parts';
import User from '../state/user';

const relation = (p: Piece) => (
  <LogCard piece={p}>{p.coordinateString}</LogCard>
);

interface P {
  user: User;
}

const MenuView: React.SFC<P> = props => {
  const { pieces } = props.user;
  return <PiecesList pieces={pieces} relation={relation} />;
};

export default MenuView;
