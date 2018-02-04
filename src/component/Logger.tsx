import * as React from 'react'
import { observer } from 'mobx-react'

import Player from '../game/player'
import Game from '../game/game'

import { ListView, KeyValueView } from './Parts'

import { LoggerStyle } from './style'

const CoordinatesAndTimes: React.SFC<{
  player: Player
  enemy: Player
}> = props => {
  const { player, enemy } = props
  return (
    <React.Fragment>
      {[player, enemy].map((pl, playerIndex) => (
        <ListView key={playerIndex} title={pl.title}>
          {pl.pieces.map((p, pieceIndex) => (
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
    const { time, player, enemy } = game
    return (
      <div style={LoggerStyle}>
        {`Total Time: ${time}`}
        <CoordinatesAndTimes player={player} enemy={enemy} />
      </div>
    )
  }
}
