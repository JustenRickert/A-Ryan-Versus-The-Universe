import * as React from 'react';
import { Link } from 'react-router-dom';
import { computed } from 'mobx';
import { observer } from 'mobx-react';

import Game, { gameContext } from '../game/game';
import Controller from '../controller/controller';
import Piece from '../game/piece';
import { Maybe, None } from '../util/util';

import Logger from './Logger';
import { Main } from './App';
import {
  BoardStyle,
  SquareStyle,
  RedSquareStyle,
  IconStyle,
  EmptyStyle
} from './style';

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
class Board extends React.Component<{ game: Game }, {}> {
  render() {
    const { time } = this.props.game;
    return <div style={BoardStyle}>{this.renderBoard()}</div>;
  }

  renderBoard() {
    const { game } = this.props;
    const places = game.board.places;

    return (
      <React.Fragment>
        {places().map((piece, i) => (
          <PieceView key={i} index={i} piece={piece} />
        ))}
      </React.Fragment>
    );
  }
}

interface State {
  controller: Controller;
}

@observer
class MatchView extends React.Component<{}, State> {
  loopID: number;

  @computed
  get game() {
    return gameContext;
  }

  constructor(props: {}) {
    super(props);

    this.state = {
      controller: new Controller()
    };
  }

  componentDidMount() {
    this.loopID = window.setInterval(() => {
      this.loop();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.loopID);
  }

  render() {
    return (
      <Main>
        <Logger game={this.game} />
        <Board game={this.game} />
        <Link to="/purchase">{`Click ETH ME`}</Link>
      </Main>
    );
  }

  handleLinkClick = () => clearInterval(this.loopID);

  loop = () => this.state.controller.loop();
}

export default MatchView;
