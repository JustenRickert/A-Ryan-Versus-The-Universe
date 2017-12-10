import * as React from 'react';
import { observer } from 'mobx-react';
import GameField from './state/gamelogic';
import './App.css';

interface GameProps {
  gameField: GameField;
}

@observer
class App extends React.Component<GameProps, any> {
  gameField: GameField = this.props.gameField;

  renderGameField() {
    const { value } = this.gameField;
    return (
      <div className="Board">
        {value.map((val: number[], id1: number) => (
          <span key={id1}>
            <br />
            {val.map((v, id2: number) => (
              <span className="Board_piece" key={id2}>
                {v}
              </span>
            ))}
          </span>
        ))}
      </div>
    );
  }

  render() {
    return <div className="App">{this.renderGameField()}</div>;
  }
}

export default App;
