import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { transaction } from 'mobx';
import GameField, { randDirection } from './state/gamelogic';
import { Cheese, Monster, GameBoard, BOARD_SIZE } from './state/gameboard';
import './index.css';

class Runner {
  randPlace(gf: GameField): void {
    const rPlace = {
      x: Math.floor(25 * Math.random()),
      y: Math.floor(25 * Math.random())
    };

    gf.place(rPlace, randDirection());
  }

  moveAll(gf: GameField): void {
    for (let x = 0; x < BOARD_SIZE; x++) {
      for (let y = 0; y < BOARD_SIZE; y++) {
        gf.move({ x, y });
      }
    }
  }

  flipAllIfTooHigh(gf: GameField): void {
    for (let x = 0; x < BOARD_SIZE; x++) {
      for (let y = 0; y < BOARD_SIZE; y++) {
        if (gf.value[x][y] > 9) {
          gf.flip({ x, y });
        }
      }
    }
  }
}

const gameField = new GameField();
const runner = new Runner();

ReactDOM.render(<App gameField={gameField} />, document.getElementById(
  'root'
) as HTMLElement);
registerServiceWorker();

let FRAME = 0;
const cheese = new Cheese({ x: 1, y: 1 });
const monster = new Monster({ x: 1, y: 2 });
const gameboard = new GameBoard([monster], [cheese]);

console.log(gameboard);

(function loop() {
  // transaction(() => {
  //   runner.randPlace(gameField);
  //   runner.moveAll(gameField);
  //   runner.flipAllIfTooHigh(gameField);
  // });

  FRAME++;
  requestAnimationFrame(loop);
})();
