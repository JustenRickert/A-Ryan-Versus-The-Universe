import * as React from 'react';
import { observable } from 'mobx';

import Piece from '../game/piece';
import User, { userContext } from '../state/user';

import { PiecesList, LogCard } from './Parts';
import { Main } from './App';

const relation = (p: Piece) => (
  <LogCard piece={p}>{p.coordinateString}</LogCard>
);

interface P {
  user: User;
}

export default class PurchaseView extends React.Component<P, {}> {
  render() {
    //   <Main>
    // <PiecesList />
    //   </Main>
    return <span>{`I'm the SHIT`}</span>;
  }
}
