import { BOARD_SIZE } from '../constant';

const margin = '55px';

export const BoardStyle = {
  display: 'grid',
  grid: `auto-flow ${margin} / repeat(${BOARD_SIZE[1]}, ${margin})`
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
  margin: 'auto'
};
