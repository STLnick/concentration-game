import React, { useEffect, useState } from 'react'

import { CardsDisplay } from './CardsDisplay'
import { Timer } from './Timer'

import './GameBoard.css'

export const GameBoard = () => {
  const [timerIsRunning, setTimerIsRunning] = useState(false)

  const handleCards = (toggle) => {
    setTimerIsRunning(toggle)
  }

  return (
    <div className="container">
      <h3 className="title">Concentration</h3>
      <Timer toggle={timerIsRunning} />
      <CardsDisplay handler={handleCards} />
    </div>
  )
}
