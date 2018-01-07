import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as _ from 'lodash';
import { observable } from 'mobx';

import App from './component/App';
import { boardConf } from './constant';
import Piece, { MShape, PShape } from './game/pieces';
import Player, { Team } from './game/player';
import { Coordinate } from './game/coordinate';
import { Placement, Board } from './game/board';

import registerServiceWorker from './registerServiceWorker';

const toNumber = Coordinate.toNumber;

const white = new Player(Team.White, [new PShape({ x: 3, y: 2 })]);
const black = new Player(Team.Black, [new MShape({ x: 0, y: 0 })]);
const board = new Board(white, black);

setInterval(() => {
  for (const p of board.pieces) {
    const space = _.sample(p.moves(board));
    if (space && p.) board.move(p, space);
  }

  board.decrement()
}, 3000);

ReactDOM.render(<App size={boardConf} board={board} />, document.getElementById(
  'root'
) as HTMLElement);
registerServiceWorker();
