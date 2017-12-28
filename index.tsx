import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as _ from 'lodash';
import { observable } from 'mobx';

import App from './component/App';
import { BOARD_SIZE } from './constant';
import Piece, { MShape } from './game/pieces';
import { Coordinate, Placement, Board } from './game/board';

import registerServiceWorker from './registerServiceWorker';

const toNumber = Coordinate.toNumber;

const pieces: Piece[] = [
  new MShape({ x: 0, y: 0 }),
  new MShape({ x: 1, y: 0 }),
  new MShape({ x: 1, y: 1 }),
  new MShape({ x: 1, y: 2 })
  // new MShape({ x: 1, y: 0 }),
  // new MShape({ x: 1, y: 1 })
];
const board = new Board(pieces);

setInterval(() => {
  console.log('moves', pieces[2].moves(board));
  for (const p of pieces) {
    board.move(p, _.sample(p.moves(board))!);
  }
}, 3000);

ReactDOM.render(
  <App size={BOARD_SIZE} board={board} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
