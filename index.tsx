import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as _ from 'lodash';

import App from './component/App';
import { BOARD_SIZE } from './constant';
import { Piece, Placement, Board } from './game/board';
import registerServiceWorker from './registerServiceWorker';

const placements: Placement[] = [
  { piece: new Piece('seven'), coordinate: { x: 1, y: 1 } },
  { piece: new Piece('hundd'), coordinate: { x: 2, y: 2 } }
];

const board = new Board(placements);

ReactDOM.render(
  <App size={BOARD_SIZE} board={board} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
