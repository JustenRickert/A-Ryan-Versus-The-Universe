import * as React from 'react';
import Coordinate from '../game/coordinate';

import { KeyValueStyle } from './style';

export const ListView: React.SFC<{ title: String }> = props => (
  <React.Fragment>
    {props.title}
    {props.children}
  </React.Fragment>
);

export const KeyValueView: React.SFC<{
  key: number;
  value: string;
}> = props => (
  <div style={KeyValueStyle} key={props.key}>
    {`${props.value}}`}
  </div>
);
