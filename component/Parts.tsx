import * as React from 'react';
import { observable } from 'mobx';

import Coordinate from '../game/coordinate';
import Game, { gameContext } from '../game/game';
import Piece from '../game/piece';
import Player, { Team } from '../game/player';
import { Maybe } from '../util/util';

import {
  BoardStyle,
  KeyValueStyle,
  ListStyle,
  SquareStyle,
  RedSquareStyle,
  IconStyle,
  BlackIconStyle,
  EmptyStyle,
  LogCardStyle
} from './style';

export const ListView: React.SFC<{ title: string }> = props => (
  <div style={ListStyle}>
    {props.title}
    {props.children}
  </div>
);

export const KeyValueView: React.SFC<{
  value: string;
}> = props => <div style={KeyValueStyle}>{`${props.value}`}</div>;

interface PieceProps {
  index: number;
  piece: Maybe<Piece>;
}

export const LogCard: React.SFC<{ piece: Piece }> = props => (
  <div style={LogCardStyle}>{props.children}</div>
);

export const PiecesList: React.SFC<{
  pieces: Piece[];
  relation: (p: Piece) => JSX.Element;
}> = props => {
  const { pieces, relation } = props;
  return <React.Fragment>{pieces.map((p, i) => relation(p))}</React.Fragment>;
};

export const PieceView: React.SFC<PieceProps> = props => {
  const { piece, index } = props;
  return (
    <div
      className="board-piece"
      style={index % 2 === 0 ? SquareStyle : RedSquareStyle}
      key={index}
    >
      {piece ? (
        <div style={piece.team === Team.White ? IconStyle : BlackIconStyle}>
          {piece.symbol}
        </div>
      ) : (
        <div style={EmptyStyle} />
      )}
    </div>
  );
};

export const Board: React.SFC<{ game: Game }> = props => {
  const { game } = props;
  const { board, time } = game; // NOTE: Need time here for when observable
  const { boardSize } = gameContext;

  let places: Maybe<Piece>[];
  if (game) {
    places = board.places();
  } else {
    const boardVolume = boardSize.x * boardSize.y;
    places = new Array(boardVolume).fill(undefined);
  }

  return (
    <div style={BoardStyle}>
      {places.map((piece, i) => <PieceView key={i} index={i} piece={piece} />)}
    </div>
  );
};
