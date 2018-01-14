import * as React from 'react';

import Player from '../game/player';
import Game from '../game/game';

import { ListView, KeyValueView } from './Parts';

import { LoggerStyle } from './style';

const PiecesCoordinates: React.SFC<{
  white: Player;
  black: Player;
}> = props => {
  const { white, black } = props;
  return (
    <React.Fragment>
      <ListView title="White Pieces">
        {white.pieces.map((p, i) => (
          <KeyValueView key={i} value={p.toCoordinateString()} />
        ))}
      </ListView>
      <ListView title="Black Pieces">
        {black.pieces.map((p, i) => (
          <KeyValueView key={i} value={p.toCoordinateString()} />
        ))}
      </ListView>
    </React.Fragment>
  );
};

interface P {
  game: Game;
}

export default class Logger extends React.Component<P, {}> {
  get white() {
    return this.props.game.white;
  }
  get black() {
    return this.props.game.black;
  }
  get board() {
    return this.props.game.board;
  }

  render() {
    const { white, black } = this.props.game;
    return (
      <div style={LoggerStyle}>
        <PiecesCoordinates white={white} black={black} />
      </div>
    );
  }
}
