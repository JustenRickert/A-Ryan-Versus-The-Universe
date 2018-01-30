import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './component/App';
import Strategy from './strategy/strategy';
import Player from './game/player';
import { gameContext } from './game/game';
import registerServiceWorker from './registerServiceWorker';

const game = gameContext;
const randomMove = Strategy.randomMove;

setInterval(() => {
  [game.white, game.black].forEach((player: Player) =>
    player.pieces.forEach(p => {
      if (!p.canMove) {
        return;
      }

      const move = randomMove(p);
      if (move) {
        player.move(game.board, p, move);
        p.reset();
      }
    })
  );

  game.white.forward();
  game.black.forward();
  game.forward();
}, 1000);

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
