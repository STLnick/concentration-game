import React from 'react'
import PropTypes from 'prop-types'
import { StyleRoot } from 'radium';

import { CardsDisplay } from './CardsDisplay'
import { Timer } from './Timer'
import { animations } from 'utils'

import './GameBoard.css'

export const GameBoard = ({ clickHandler, numCards, time, toggle }) => {
  return (
    <div className="container">
      <StyleRoot>
        <h3 className="title" style={animations.lightSpeedIn}>Concentration</h3>
      </StyleRoot>
      <StyleRoot>
        <div className="input-container" style={animations.fadeIn}>
          <label htmlFor="num-cards">Number of Pairs to Play With</label>
          <input id="num-cards" min="2" step="2" type="number" />
          <button onClick={clickHandler}>Deal</button>
        </div>
      </StyleRoot>
      <Timer time={time} toggle={toggle} />
      <CardsDisplay timerHandler={toggle} numberOfCards={numCards} />
    </div>
  )
}

GameBoard.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  toggle: PropTypes.func.isRequired
}
