import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as _ from 'lodash';
import { observable } from 'mobx';

import App from './component/App';
import { boardConf } from './constant';
import Piece, { MShape, PShape } from './game/piece';
import Player, { Team } from './game/player';
import Coordinate from './game/coordinate';
import Board, { Placement } from './game/board';

import registerServiceWorker from './registerServiceWorker';

const toNumber = Coordinate.toNumber;

const white = new Player(Team.White, [
  new PShape(Team.White, { x: 0, y: 2 }),
  new MShape(Team.White, { x: 1, y: 2 }),
  new PShape(Team.White, { x: 5, y: 2 })
]);
const black = new Player(Team.Black, [
  new MShape(Team.Black, { x: 0, y: 0 }),
  new PShape(Team.Black, { x: 0, y: 1 }),
  new MShape(Team.Black, { x: 3, y: 2 })
]);
const board = new Board(white, black);

setInterval(() => {
  [white, black].forEach(player => {
    for (const p of player.pieces) {
      const space = _.sample(p.emptyMoves(board));
      if (p.canMove && space && p.emptyMoves.length) {
        player.move(board, p, space);
      }
    }
  });

  board.forward();
}, 500);

ReactDOM.render(<App size={boardConf} board={board} />, document.getElementById(
  'root'
) as HTMLElement);
registerServiceWorker();
