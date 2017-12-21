import * as React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

import { Board } from '../game/board';
import { BoardStyle, SquareStyle, IconStyle } from './style';
import './App.css';

interface Props {
  size: [number, number];
  board: Board;
}

@observer
class App extends React.Component<Props, {}> {
  render() {
    return <div className="App">{this.renderBoardLines()}</div>;
  }

  private renderBoardLines() {
    const { board, size } = this.props;
    const arr = new Array(size[0] * size[1]).fill(undefined);
    board.placements.forEach((p, i) => console.log(p, i));
    board.placements.forEach((p, i) => (arr[i] = p.symbol));

    return (
      <div style={BoardStyle}>
        {arr.map((_, i) => (
          <div
            style={
              i % 2 === 0 ? (
                SquareStyle
              ) : (
                { backgroundColor: 'red', ...SquareStyle }
              )
            }
            key={i}
          >
            <div style={IconStyle}>{arr[i] ? arr[i] : ''}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
