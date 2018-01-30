import * as React from 'react'
// import Coordinate from '../game/coordinate';

import { KeyValueStyle, ListStyle } from './style'

export const ListView: React.SFC<{ title: string }> = props => (
  <div style={ListStyle as React.CSSProperties}>
    {props.title}
    {props.children}
  </div>
)

export const KeyValueView: React.SFC<{
  value: string
}> = props => <div style={KeyValueStyle}>{`${props.value}`}</div>
