import { boardSize } from '../constant';

const boardMargin = '55px';
const itemMargin = '4px';
const border = '1px solid black';

export const Style = {
  fontFamily: 'Inconsolata'
};

export const BoardStyle = {
  display: 'grid',
  grid: `auto-flow ${boardMargin} / repeat(${boardSize.x}, ${boardMargin})`,
  flex: '4'
};

export const EmptyStyle = {
  margin: 'auto'
};

export const IconStyle = {
  margin: 'auto',
  width: '20px',
  textAlign: 'center',
  border: `${border}`,
  borderRadius: '10px',
  color: 'black',
  backgroundColor: 'white'
};

export const BlackIconStyle = {
  ...IconStyle,
  color: 'white',
  backgroundColor: 'black'
};

export const KeyValueStyle = {
  color: 'red',
  flex: '1'
};

export const ListStyle = {
  display: 'flex',
  'flex-direction': 'column'
};

export const MainStyle = { display: 'flex' };

export const LogCardStyle = {
  flex: '1',
  padding: '10px',
  margin: `${itemMargin}`,
  border: `${border}`,
  textAlign: 'center'
};

export const LoggerStyle = {
  flex: '1',
  margin: `${itemMargin}`
};

export const RedSquareStyle = {
  border: `${border}`,
  display: 'flex',
  backgroundColor: 'red'
};

export const SquareStyle = {
  border: `${border}`,
  display: 'flex'
};
