import React, { useEffect, useState } from 'react';
import {
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

    document.querySelector('#form-btn').disabled = true;

    // If there are less than 10 scores just add the new score no matter what
    if (scores.length < 10) {
      // Update state with new score
      setScores(prevScores => {
        return [...prevScores, newScore]
      })

      await scoresRepo.addScore(newScore)
    }
    // If there are 10 scores already determine if new score qualifies as Top 10, if so remove lowest score and add in new score
    else {
      const lowestScore = scores
        .sort((a, b) => utils.minutesAndSecondsToSeconds(a.time) - utils.minutesAndSecondsToSeconds(b.time))[scores.length - 1]

      // Does new score qualify as Top 10?
      if (utils.minutesAndSecondsToSeconds(newScore.time) < utils.minutesAndSecondsToSeconds(lowestScore.time)) {
        // Remove lowest score
        setScores(prevScores => prevScores.filter(score => score._id !== lowestScore._id))

        // Add to state
        setScores(prevScores => {
          return [...prevScores, newScore]
        })

        // Delete lowest score
        await scoresRepo.replaceScore(lowestScore, newScore)
      }
    }


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
