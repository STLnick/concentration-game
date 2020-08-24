import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation
} from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import api from 'api'
import utils from 'utils'

import { GameBoard, GameOver, Header, HowToPlay, Welcome } from './components'

import './App.css';

const scoresRepo = api('scores')

export const App = () => {
  const location = useLocation()
  const [numPairs, setNumPairs] = useState(0)
  const [scores, setScores] = useState([])
  const [time, setTime] = useState(0)
  const [timerIsRunning, setTimerIsRunning] = useState(false)

  // Get scores in database
  useEffect(() => {
    (async () => {
      setScores(await scoresRepo.getScores())
    })()
  }, [])

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

  const handleClick = () => {
    setNumPairs(parseInt(document.querySelector('input').value))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Get user name
    const name = e.target.querySelector('#user-name').value

    // Create new score object
    const newScore = {
      initials: name,
      pairs: numPairs,
      time: utils.secondsToMinutesAndSeconds(time)
    }

    // Update state with new score
    setScores(prevScores => {
      return [...prevScores, newScore]
    })

    document.querySelector('#form-btn').disabled = true;

    const res = await scoresRepo.addScore(newScore)
  }

  return (
    <>
      <Header />
      <AnimatePresence>
        <Switch location={location} key={location.key}>
          <Route path="/game">
            <GameBoard
              clickHandler={handleClick}
              numCards={numPairs}
              time={time}
              toggle={handleTimerIsRunning}
            />
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
      </AnimatePresence>
    </>
  );
}
