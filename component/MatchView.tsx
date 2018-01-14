import * as React from 'react';
import { Link } from 'react-router-dom';
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';

import Controller from '../controller/controller';
import Game, { gameContext } from '../game/game';
import { Team } from '../game/player';
import { Maybe, None } from '../util/util';

import Logger from './Logger';
import { PieceView } from './Parts';
import { Main } from './App';
import { Board } from './Parts';
import {
  BoardStyle,
  SquareStyle,
  RedSquareStyle,
  BlackIconStyle,
  IconStyle,
  EmptyStyle
} from './style';

const BoardView = observer(Board);

interface State {
  controller: Controller;
}

@observer
class MatchView extends React.Component<{}, State> {
  loopID: number;

  @computed
  get game() {
    return gameContext;
  }

  constructor(props: {}) {
    super(props);

    this.state = {
      controller: new Controller()
    };
  }

  componentDidMount() {
    this.loopID = window.setInterval(() => {
      this.state.controller.loop();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.loopID);
  }

  render() {
    return (
      <Main>
        <Logger game={this.game} />
        <BoardView game={this.game} />
        <Link to="/purchase">{`Click ETH ME`}</Link>
      </Main>
    );
  }
}

export default MatchView;
