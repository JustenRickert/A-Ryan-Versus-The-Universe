import { shuffle } from 'lodash';
import { toJS } from 'mobx';

import { gameContext } from '../game/game';
import Strategy from '../strategy/strategy';

const randomMove = Strategy.randomMove;

// setInterval(() => {
//   [game.white, game.black].forEach((player: Player) =>
//     player.pieces.forEach(p => {
//       if (!p.canMove) {
//         return;
//       }

//       const move = randomMove(p);
//       if (move) {
//         player.move(game.board, p, move);
//         p.reset();
//       }
//     })
//   );

//   game.white.forward();
//   game.black.forward();
//   game.forward();
// }, 1000);

export default class Controller {
  get game() {
    return gameContext;
  }

  get shuffledMoveablePieces() {
    return shuffle(gameContext.board.pieces.filter(p => p.canMove));
  }

  loop() {
    this.moveRandomlyAllMoveablePieces();
    this.forward();
  }

  forward() {
    this.game.white.forward();
    this.game.black.forward();
    this.game.forward();
  }

  moveRandomlyAllMoveablePieces() {
    const { board } = this.game;
    this.shuffledMoveablePieces.forEach(p => {
      const target = randomMove(p);

      if (target) {
        board.move(p, target);
        p.reset();
      }
    });
  }
}
