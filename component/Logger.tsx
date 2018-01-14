import * as React from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';

import Player from '../game/player';
import Piece from '../game/piece';
import Game from '../game/game';

import { ListView, KeyValueView } from './Parts';

import { LoggerStyle, LogCardStyle } from './style';

const LogCardListView: React.SFC<{
  white: Player;
  black: Player;
}> = props => {
  const { white, black } = props;
  return (
    <React.Fragment>
      {[white, black].map((player, playerIndex) => (
        <ListView key={playerIndex} title={player.title}>
          {player.pieces.map((p, pieceIndex) => (
            <LogCard piece={p}>
              <KeyValueView
                key={pieceIndex}
                value={`${p.coordinateString},${p.ti}`}
              />
            </LogCard>
          ))}
        </ListView>
      ))}
    </React.Fragment>
  );
};

const LogCard: React.SFC<{ piece: Piece }> = props => (
  <div style={LogCardStyle}>{props.children}</div>
);

interface P {
  game: Game;
}

@observer
export default class Logger extends React.Component<P, {}> {
  render() {
    const { game } = this.props;
    const { time, white, black } = game;
    return (
      <div style={LoggerStyle}>
        {`Total Time: ${time}`}
        <LogCardListView white={white} black={black} />
      </div>
    );
  }
}
