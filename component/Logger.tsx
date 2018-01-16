import * as React from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';

import Player from '../game/player';
import Piece from '../game/piece';
import Game from '../game/game';

import { LogCard, ListView, KeyValueView } from './Parts';

import { LoggerStyle } from './style';

interface P {
  game: Game;
}

const LogCardTeamListView: React.SFC<{
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

@observer
export default class Logger extends React.Component<P, {}> {
  render() {
    const { game } = this.props;
    const { time, white, black } = game;
    return (
      <div style={LoggerStyle}>
        {`Total Time: ${time}`}
        <LogCardTeamListView white={white} black={black} />
      </div>
    );
  }
}
