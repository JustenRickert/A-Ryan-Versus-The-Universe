import * as React from 'react';
import { Link } from 'react-router-dom';
import { computed, toJS } from 'mobx';
import { observer } from 'mobx-react';

import Coordinate from '../game/coordinate';
import Game, { gameContext } from '../game/game';
import Piece from '../game/piece';
import { Maybe, Time, None } from '../util/util';

import Logger from './Logger';
import {
  BoardStyle,
  EmptyStyle,
  IconStyle,
  MainStyle,
  RedSquareStyle,
  SquareStyle
} from './style';

export const MenuView = (props: {}) => (
  <Main>
    <span>
      <Link to="/match">{`This is always the menu thing`}</Link>
      <br />
      <Link to="/purchase">{`This is always purchasing time`}</Link>
    </span>
  </Main>
);

export const PurchaseView = (props: {}) => (
  <Main>
    <span>
      <Link to="/match">{`Click the fuck outta ME`}</Link>
    </span>
  </Main>
);

export const Main: React.SFC<{ time?: Time }> = props => {
  return (
    <div className="App" style={MainStyle}>
      {props.children}
    </div>
  );
};

/**
 * APP VIEW
 */

@observer
export default class App extends React.Component<{}, {}> {
  @computed
  get gameContext() {
    return gameContext;
  }

  render() {
    return <div className="App">{this.renderBoardLines()}</div>;
  }

  private renderBoardLines() {
    const { boardSize, board } = gameContext;

    const places: Maybe<Piece>[] = new Array(boardSize.x * boardSize.y).fill(
      undefined
    );
    board.placeMap.forEach((p, index) => {
      if (p instanceof Piece) places[index] = p;
    });

    return <Main>{this.props.children}</Main>;
  }
}
