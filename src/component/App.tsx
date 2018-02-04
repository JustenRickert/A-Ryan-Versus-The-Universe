import * as React from 'react'
import { observer } from 'mobx-react'

// import { boardConf } from '../constant';
// import Coordinate from '../game/coordinate';
import Piece from '../game/piece'

import Logger from './Logger'
import {
  BoardStyle,
  EmptyStyle,
  IconStyle,
  MainStyle,
  RedSquareStyle,
  SquareStyle
} from './style'
import './App.css'
import GameContext from '../game/game'

type None = undefined
type Maybe<T> = T | None

interface PieceProps {
  index: number
  piece: Piece | None
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
  )
}

const Board: React.SFC<{ places: Maybe<Piece>[] }> = props => {
  const { places } = props
  return (
    <div style={BoardStyle}>
      {places.map((piece, i) => <PieceView key={i} index={i} piece={piece} />)}
    </div>
  )
}

const Main: React.SFC<{}> = props => {
  return <div style={MainStyle}>{props.children}</div>
}

/**
 * MATCH VIEW
 */

interface MatchProps {
  game: GameContext
}

@observer
export default class MatchView extends React.Component<MatchProps, {}> {
  constructor(props: MatchProps) {
    super(props)
  }

  render() {
    return <div className="App">{this.renderBoardLines()}</div>
  }

  private renderBoardLines() {
    const { boardSize, board } = this.props.game

    const places: Maybe<Piece>[] = new Array(boardSize.x * boardSize.y).fill(
      undefined
    )
    board.placeMap.forEach((p, index) => {
      if (p instanceof Piece) places[index] = p
    })

    return (
      <Main>
        <Logger game={this.props.game} />
        <Board places={places} />
      </Main>
    )
  }
}
