import React, { useState } from 'react'

import { CardsDisplay } from './CardsDisplay'
import { Timer } from './Timer'

export const GameBoard = () => {
  const [timerIsRunning, setTimerIsRunning] = useState(false)



  const handleTimerToggle = () => {
    setTimerIsRunning(!timerIsRunning)
  }

  return (
    <div>
      <h3>Game Board</h3>
      <CardsDisplay />
      <Timer toggle={handleTimerToggle} />
    </div>
  )
}
