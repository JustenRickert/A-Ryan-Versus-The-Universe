import { boardConf } from '../constant';

const margin = '55px';

export const BoardStyle = {
  display: 'grid',
  grid: `auto-flow ${margin} / repeat(${boardConf.x}, ${margin})`,
  flex: '4'
};

export const EmptyStyle = {
  margin: 'auto'
};

export const IconStyle = {
  margin: 'auto',
  width: '20px',
  borderRadius: '10px',
  border: '1px solid black'
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

export const LoggerStyle = {
  flex: '1'
};

export const RedSquareStyle = {
  border: '1px solid black',
  display: 'flex',
  backgroundColor: 'red'
};

export const SquareStyle = {
  border: '1px solid black',
  display: 'flex'
};
