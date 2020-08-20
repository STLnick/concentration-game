import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom'

import { GameBoard, HowToPlay, Welcome } from './components'

import './App.css';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/game">
          <GameBoard />
        </Route>
        <Route path="/howtoplay">
          <HowToPlay />
        </Route>
        <Route exact path="/">
          <Welcome />
        </Route>
      </Switch>
    </Router>
  );
}
