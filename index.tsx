import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

import { MenuView } from './component/App';
import PurchaseView from './component/PurchaseView';
import MatchView from './component/MatchView';

import { createGameContext } from './game/game';
import { gameContext } from './state/game';
import { userContext } from './state/user';

import { Style } from './component/style';

const user = userContext;

ReactDOM.render(
  <Router>
    <div style={Style}>
      <Route path="/match">
        <MatchView game={gameContext} />
      </Route>

      <Route path="/purchase">
        <PurchaseView user={userContext} />
      </Route>

      <Route path="/">
        <MenuView />
      </Route>
    </div>
  </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
