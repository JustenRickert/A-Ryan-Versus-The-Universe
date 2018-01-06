import * as React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

import { boardConf } from '../constant';
import { Coordinate } from '../game/coordinate';
import { Board } from '../game/board';

import Piece from '../game/pieces';
import {
  BoardStyle,
  EmptyStyle,
  SquareStyle,
  RedSquareStyle,
  IconStyle
} from './style';
import './App.css';

interface Props {
  size: { x: number; y: number };
  board: Board;
}

type None = undefined;

interface PieceProps {
  index: number;
  piece: Piece | None;
}

const PieceView: React.SFC<PieceProps> = props => {
  return (
    <div
      className="board-piece"
      style={props.index % 2 === 0 ? SquareStyle : RedSquareStyle}
      key={props.index}
    >
      {props.piece ? (
        <div style={IconStyle}>{props.piece.symbol}</div>
      ) : (
        <div style={EmptyStyle} />
      )}
    </div>
  );
};

@observer
class App extends React.Component<Props, {}> {
  render() {
    return <div className="App">{this.renderBoardLines()}</div>;
  }

  private renderBoardLines() {
    const { board, size } = this.props;

    const places: (Piece | None)[] = new Array(size.x * size.y).fill(undefined);
    board.placeMap.forEach(p => {
      if (p instanceof Piece) places[Coordinate.toNumber(p.c)] = p;
    });

    return (
      <div style={BoardStyle}>
        {places.map((piece, i) => (
          <PieceView key={i} index={i} piece={piece} />
        ))}
      </div>
    );
  }
}

export default App;
