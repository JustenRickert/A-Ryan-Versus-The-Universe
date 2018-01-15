import * as React from 'react';
import { Link } from 'react-router-dom';
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';

import Controller from '../controller/controller';
import Game from '../game/game';
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

interface P {
  game: Maybe<Game>;
}

interface S {
  controller: Maybe<Controller>;
}

@observer
class MatchView extends React.Component<P, S> {
  loopID: number;

  constructor(props: P) {
    super(props);

    this.state = {
      controller: this.props.game ? new Controller(this.props.game) : undefined
    };
  }

  componentDidMount() {
    if (this.props.game) {
      this.loopID = window.setInterval(() => {
        this.state.controller!.loop();
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.loopID);
  }

  render() {
    if (this.props.game) {
      return (
        <Main>
          <Logger game={this.props.game} />
          <BoardView game={this.props.game} />
        </Main>
      );
    } else {
      return <Main>{`There is no game context`}</Main>;
    }
  }
}

export default MatchView;
