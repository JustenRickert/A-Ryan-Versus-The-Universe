import { boardConf } from '../constant';

const margin = '55px';

export const BoardStyle = {
  display: 'grid',
  grid: `auto-flow ${margin} / repeat(${boardConf.x}, ${margin})`
};

export const SquareStyle = {
  border: '1px solid black',
  display: 'flex'
};

export const RedSquareStyle = {
  border: '1px solid black',
  display: 'flex',
  backgroundColor: 'red'
};

export const IconStyle = {
  margin: 'auto',
  width: '20px',
  borderRadius: '10px',
  border: '1px solid black'
};

export const EmptyStyle = {
  margin: 'auto'
};
