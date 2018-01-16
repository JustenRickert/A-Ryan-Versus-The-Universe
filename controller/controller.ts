import { shuffle } from 'lodash';
import { toJS } from 'mobx';

import Game from '../game/game';
import Strategy from '../strategy/strategy';

const randomMove = Strategy.randomMove;

export default class Controller {
  gameContext: Game;

  get game() {
    return this.gameContext;
  }

  get shuffledMoveablePieces() {
    return shuffle(this.gameContext.board.pieces.filter(p => p.canMove));
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
      const target = randomMove(board, p);
      if (target) {
        board.move(p, target);
        p.reset();
      }
    });
  }

  constructor(gameContext: Game) {
    this.gameContext = gameContext;
  }
}
