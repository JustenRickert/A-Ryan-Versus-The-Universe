import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as _ from 'lodash';

import App from './component/App';
import Piece, { MShape, PShape } from './game/piece';
import Player, { Team } from './game/player';
import Coordinate from './game/coordinate';
import Board, { Placement } from './game/board';
import { game } from './game/game';
import registerServiceWorker from './registerServiceWorker';

setInterval(() => {
  // [white, black].forEach(player => {
  //   for (const p of player.pieces) {
  //     const space = _.sample(p.emptyMoves(board));
  //     if (p.canMove && space && p.emptyMoves.length) {
  //       player.move(board, p, space);
  //     }
  //   }
  // });
  // board.forward();
}, 500);

ReactDOM.render(<App game={game} />, document.getElementById(
  'root'
) as HTMLElement);
registerServiceWorker();
