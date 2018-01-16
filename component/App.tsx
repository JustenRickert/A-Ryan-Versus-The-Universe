import * as React from 'react';
import { Link } from 'react-router-dom';
import { computed, toJS } from 'mobx';
import { observer } from 'mobx-react';

import Coordinate from '../game/coordinate';
import Game from '../game/game';
import Piece from '../game/piece';
import User, { userContext } from '../state/user';
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
