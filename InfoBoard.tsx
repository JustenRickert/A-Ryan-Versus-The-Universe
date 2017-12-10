import * as React from 'react';
import { observer } from 'mobx-react';
import './App.css';

interface InfoBoardProps {
  // gameField: GameField;
}

@observer
class InfoBoard extends React.Component<InfoBoardProps, any> {
  render() {
    return (
      <div className="InfoBoard">{'I am the information board! Hello!'}</div>
    );
  }
}

export default InfoBoard;
