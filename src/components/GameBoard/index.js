import React, { useEffect, useState } from 'react'

import { CardsDisplay } from './CardsDisplay'
import { Timer } from './Timer'

import './GameBoard.css'

export const GameBoard = () => {
  const [timeLeft, setTimeLeft] = useState(300)
  const [timerIsRunning, setTimerIsRunning] = useState(false)

  useEffect(() => {
    if (timeLeft === 1)
      setTimerIsRunning(false)
    if (timerIsRunning) {
      setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    }
  }, [timerIsRunning, timeLeft])

  const handleTimerToggle = () => {
    setTimerIsRunning(!timerIsRunning)
  }

  return (
    <div className="container">
      <h3 className="title">Concentration</h3>
      <Timer time={timeLeft} />
      <CardsDisplay toggle={handleTimerToggle} />
    </div>
  )
}
