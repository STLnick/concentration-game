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

  const handleSubmit = (e) => {
    e.preventDefault()

    if (e.target.querySelector('input').value % 2 === 0) {
      setNumCards(parseInt(e.target.querySelector('input').value))
    }
  }

  return (
    <div className="container">
      <h3 className="title">Concentration</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="num-cards">Number of Pairs to Play With</label>
        <input id="num-cards" min="2" type="number" />
        <button type="submit">Deal</button>
      </form>
      <Timer toggle={timerIsRunning} />
      <CardsDisplay handler={handleCards} numberOfCards={numCards} />
    </div>
  )
}
