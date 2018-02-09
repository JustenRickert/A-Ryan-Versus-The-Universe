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

  get game() {
    return this.props.game
  }

  get board() {
    if (this.game.isInitialized) return this.game.board!
    else throw new Error(`This error shouldn't ever be read`)
  }

  get boardSize() {
    return this.props.game.boardSize
  }

  render() {
    // if (!this.props.game.board.isInitializedForGame)
    //   throw new Error(`Cannot render an uninitialized board`)
    return (
      <div className="App">
        {this.game.isInitialized
          ? this.renderBoardLines()
          : this.renderSorryNoGame()}
      </div>
    )
  }

  private renderSorryNoGame() {
    return <div>{`Sorry but the game isn't initialized`}</div>
  }

  private renderBoardLines() {
    const places: Maybe<Piece>[] = new Array(
      this.boardSize.x * this.boardSize.y
    ).fill(undefined)

    this.board.placeMap.forEach((p, index) => {
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
