import * as React from 'react';
import { observable } from 'mobx';

import Piece from '../game/piece';
import { gameContext } from '../game/game';

import { PiecesList, LogCard } from './Parts';
import { Main } from './App';

const relation = (p: Piece) => (
  <LogCard piece={p}>{p.coordinateString}</LogCard>
);

export default class PurchaseView extends React.Component<{}, {}> {
  render() {
    //   <Main>
    // <PiecesList />
    //   </Main>
    return <span>{`I'm the SHIT`}</span>;
  }
}
