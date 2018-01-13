import * as React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

import { boardConf } from '../constant';
import Coordinate from '../game/coordinate';
import Board from '../game/board';
import Piece from '../game/piece';

import Logger from './Logger';
import {
  BoardStyle,
  EmptyStyle,
  IconStyle,
  MenuStyle,
  RedSquareStyle,
  SquareStyle
} from './style';
import './App.css';

interface Props {
  size: { x: number; y: number };
  board: Board;
}

type None = undefined;
type Maybe<T> = T | None;

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

const AppView: React.SFC<{}> = props => {
  return <div style={MenuStyle}>{props.children}</div>;
};

@observer
class App extends React.Component<Props, {}> {
  render() {
    return <div className="App">{this.renderBoardLines()}</div>;
  }

  private renderBoardLines() {
    const { board, size } = this.props;

    const places: Maybe<Piece>[] = new Array(size.x * size.y).fill(undefined);
    board.placeMap.forEach((p, index) => {
      if (p instanceof Piece) places[index] = p;
    });

    return (
      <AppView>
        <Logger />
        {this.renderBoard(places)}
      </AppView>
    );
  }

  private renderBoard(places: Maybe<Piece>[]) {
    return <div style={BoardStyle}>{this.renderPieceViews(places)}</div>;
  }

  private renderPieceViews(places: Maybe<Piece>[]) {
    return (
      <React.Fragment>
        {places.map((piece, i) => (
          <PieceView key={i} index={i} piece={piece} />
        ))}
      </React.Fragment>
    );
  }
}

export default App;
