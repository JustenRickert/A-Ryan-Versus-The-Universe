import * as React from 'react'
// import { computed } from 'mobx';
import { observer } from 'mobx-react'

import Player from '../game/player'
import Game from '../game/game'

import { ListView, KeyValueView } from './Parts'

import { LoggerStyle } from './style'

const CoordinatesAndTimes: React.SFC<{
  white: Player
  black: Player
}> = props => {
  const { white, black } = props
  return (
    <React.Fragment>
      {[white, black].map((player, playerIndex) => (
        <ListView key={playerIndex} title={player.title}>
          {player.pieces.map((p, pieceIndex) => (
            <KeyValueView
              key={pieceIndex}
              value={`${p.coordinateString},${p.ti}`}
            />
          ))}
        </ListView>
      ))}
    </React.Fragment>
  )
}

interface P {
  game: Game
}

@observer
export default class Logger extends React.Component<P, {}> {
  render() {
    const { game } = this.props
    const { time, white, black } = game
    return (
      <div style={LoggerStyle}>
        {`Total Time: ${time}`}
        <CoordinatesAndTimes white={white} black={black} />
      </div>
    )
  }
}
