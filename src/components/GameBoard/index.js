import React, { useState } from 'react'

import { CardsDisplay } from './CardsDisplay'
import { Timer } from './Timer'

import './GameBoard.css'

export const GameBoard = () => {
  const [timeLeft, setTimeLeft] = useState('5:00')
  const [timerIsRunning, setTimerIsRunning] = useState(false)

  const handleTimerToggle = () => {
    setTimerIsRunning(!timerIsRunning)
  }

  return (
    <div className="container">
      <h3 className="title">Concentration</h3>
      <Timer time={timeLeft} toggle={handleTimerToggle} />
      <CardsDisplay />
    </div>
  )
}
