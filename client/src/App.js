import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom'
import utils from 'utils'

import { GameBoard, GameOver, HowToPlay, Welcome } from './components'

import './App.css';

export const App = () => {
  const [scores, setScores] = useState([
    { initials: 'NR', time: '0:40' },
    { initials: 'AK', time: '0:30' },
    { initials: 'MM', time: '0:35' },
  ])
  const [time, setTime] = useState(0)
  const [timerIsRunning, setTimerIsRunning] = useState(false)

  const handleTimerIsRunning = (toggle) => {
    setTimerIsRunning(toggle)
  }

  useEffect(() => {
    while (timerIsRunning) {
      const intervalID = setInterval(() => {
        setTime(() => time + 1)
      }, 1000)
      // Cleanup function
      return () => {
        clearInterval(intervalID)
      }
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    // Get user name
    const name = e.target.querySelector('#user-name').value

    // TODO: Get user time

    // TODO: Update state with initials and time
    setScores(prevScores => {
      return [...prevScores, { initials: name, time: utils.secondsToMinutesAndSeconds(time) }]
    })

    document.querySelector('#form-btn').disabled = true;
  }

  return (
    <Router>
      <Switch>
        <Route path="/game">
          <GameBoard time={time} toggle={handleTimerIsRunning} />
        </Route>
        <Route path="/gameover">
          <GameOver handler={handleSubmit} scores={scores} />
        </Route>
        <Route path="/howtoplay">
          <HowToPlay />
        </Route>
        <Route exact path="/">
          <Welcome scores={scores} />
        </Route>
      </Switch>
    </Router>
  );
}
