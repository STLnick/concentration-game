import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { CardsDisplay } from './CardsDisplay'
import { Timer } from './Timer'

import './GameBoard.css'

export const GameBoard = ({ time, toggle }) => {
  const [numCards, setNumCards] = useState(0)

  const handleClick = () => {
    setNumCards(parseInt(document.querySelector('input').value))
  }

  return (
    <div className="container">
      <h3 className="title">Concentration</h3>
      <div className="input-container">
        <label htmlFor="num-cards">Number of Pairs to Play With</label>
        <input id="num-cards" min="2" step="2" type="number" />
        <button onClick={handleClick}>Deal</button>
      </div>
      <Timer time={time} toggle={toggle} />
      <CardsDisplay timerHandler={toggle} numberOfCards={numCards} />
    </div>
  )
}

GameBoard.propTypes = {
  time: PropTypes.number.isRequired,
  toggle: PropTypes.func
}
