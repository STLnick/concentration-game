import React, { useEffect, useState } from 'react'

import { CardsDisplay } from './CardsDisplay'
import { Timer } from './Timer'

import './GameBoard.css'

export const GameBoard = () => {
  const [timeLeft, setTimeLeft] = useState(300)
  const [timerIsRunning, setTimerIsRunning] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)
  }, [timeLeft])

  const handleTimerToggle = () => {
    setTimerIsRunning(!timerIsRunning)
  }

  return (
    <div className="container">
      <h3 className="title">Concentration</h3>
      <CardsDisplay />
      <Timer time={timeLeft} toggle={handleTimerToggle} />
    </div>
  )
}
