import * as React from 'react'
import { observer } from 'mobx-react'

// import { boardConf } from '../constant';
import Coordinate from '../game/coordinate'
import Piece from '../game/piece'
import Board from '../game/board'

import Logger from './Logger'
import {
  BoardStyle,
  EmptyStyle,
  IconStyle,
  MainStyle,
  RedSquareStyle,
  WhiteSquareStyle
} from './style'
import './App.css'
import GameContext from '../game/game'

type None = undefined
type Maybe<T> = T | None

const toCoordinate = Coordinate.toCoordinate
const toNumber = Coordinate.toNumber

const isRedSquare = (index: Coordinate) =>
  (index.x % 2 || index.y % 2) && !(index.x % 2 && index.y % 2)

interface PieceProps {
  cIndex: Coordinate
  piece: Piece | None
}

const PieceView: React.SFC<PieceProps> = props => {
  return (
    <div
      className="board-piece"
      style={isRedSquare(props.cIndex) ? WhiteSquareStyle : RedSquareStyle}
      key={toNumber(props.cIndex)}
    >
      {props.piece ? (
        <div style={IconStyle}>{props.piece.symbol}</div>
      ) : (
        <div style={EmptyStyle} />
      )}
    </div>
  )
}

const BoardView: React.SFC<{ board: Board }> = props => {
  const places = new Array<Maybe<Piece>>(
    props.board.size.x * props.board.size.y
  ).fill(undefined)

  props.board.placeMap.forEach((p, index) => {
    if (p instanceof Piece) places[index] = p
  })

  return (
    <div style={BoardStyle}>
      {places.map((piece, i) => (
        <PieceView key={i} cIndex={toCoordinate(i)} piece={piece} />
      ))}
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
    return (
      <div className="App">
        {this.props.game.initialized
          ? this.renderBoardLines()
          : this.renderSorryNoGame()}
      </div>
    )
  }

  private renderSorryNoGame() {
    return (
      <div>
        {`Sorry but the game isn't initialized. It's because something went wrong.`}
      </div>
    )
  }

  private renderBoardLines() {
    return (
      <Main>
        <div key={this.props.game.time} />
        <Logger game={this.props.game} />
        <BoardView board={this.props.game.cBoard.value} />
      </Main>
    )
  }
}
