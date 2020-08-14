import React, { useState } from 'react'

import { CardsDisplay } from './CardsDisplay'
import { Timer } from './Timer'

import './GameBoard.css'

export const GameBoard = () => {
  const [numCards, setNumCards] = useState(0)
  const [timerIsRunning, setTimerIsRunning] = useState(false)

  const handleCards = (toggle) => {
    setTimerIsRunning(toggle)
  }

  const handleClick = () => {
    setNumCards(parseInt(document.querySelector('input').value))
  }

  //handle submit needed...

  return (
    <div className="container">
      <h3 className="title">Concentration</h3>
      <div className="input-container">
        <label htmlFor="num-cards">Number of Pairs to Play With</label>
        <input id="num-cards" min="2" step="2" type="number" />
        <button onClick={handleClick}>Deal</button>
      </div>
      <Timer toggle={timerIsRunning} />
      <CardsDisplay handler={handleCards} numberOfCards={numCards} />
    </div>
  )
}
