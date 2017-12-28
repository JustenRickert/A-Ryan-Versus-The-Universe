import * as React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

import { Coordinate, Board } from '../game/board';
import Piece from '../game/pieces';
import { BoardStyle, SquareStyle, RedSquareStyle, IconStyle } from './style';
import './App.css';

interface Props {
  size: [number, number];
  board: Board;
}

interface P {
  value: number;
  piece: Piece | undefined;
}

const PieceView: React.SFC<P> = props => (
  <div
    className="board-piece"
    style={props.value % 2 === 0 ? SquareStyle : RedSquareStyle}
    key={props.value}
  >
    {props.piece ? (
      <div style={IconStyle}>{props.piece.symbol}</div>
    ) : (
      <div style={IconStyle} />
    )}
  </div>
);

@observer
class App extends React.Component<Props, {}> {
  render() {
    return <div className="App">{this.renderBoardLines()}</div>;
  }

  private renderBoardLines() {
    const { board, size } = this.props;

    const spaces: Piece[] = new Array(size[0] * size[1]).fill(undefined);
    const testPiece = Array.from(board.placements.values())[1];
    board.placements.forEach(p => (spaces[Coordinate.toNumber(p.c)] = p));

    return (
      <div style={BoardStyle}>
        {spaces.map((piece, i) => (
          <PieceView key={i} value={i} piece={piece} />
        ))}
      </div>
    );
  }
}

export default App;
