import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as _ from 'lodash';
import { observable } from 'mobx';

import App from './component/App';
import { boardConf } from './constant';
import Piece, { MShape } from './game/pieces';
import { Coordinate } from './game/coordinate';
import { Placement, Board } from './game/board';

import registerServiceWorker from './registerServiceWorker';

const toNumber = Coordinate.toNumber;

const pieces: Piece[] = [new MShape({ x: 0, y: 0 })];
const board = new Board(pieces);

setInterval(() => {
  for (const p of pieces) {
    const space = _.sample(p.moves(board));
    if (space) board.move(p, space);
  }
}, 3000);

ReactDOM.render(<App size={boardConf} board={board} />, document.getElementById(
  'root'
) as HTMLElement);
registerServiceWorker();
