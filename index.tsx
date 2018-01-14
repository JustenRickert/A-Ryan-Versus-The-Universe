import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as _ from 'lodash';

import App, { MenuView, PurchaseView } from './component/App';
import { Style } from './component/style';
import MatchView from './component/MatchView';
import Player from './game/player';
import { gameContext as game } from './game/game';
import { userContext as user } from './state/user';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <div style={Style}>
      <Route path="/match" component={MatchView} />
      <Route path="/purchase" component={PurchaseView} />
      <Route path="/" component={MenuView} />
    </div>
  </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
