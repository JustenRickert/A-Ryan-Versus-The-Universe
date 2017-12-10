import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import GameField from './state/gamelogic';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const gameField = new GameField();
  ReactDOM.render(<App gameField={gameField} />, div);
});
