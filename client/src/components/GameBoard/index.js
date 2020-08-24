import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

import { CardsDisplay } from './CardsDisplay'
import { Timer } from './Timer'

import './GameBoard.css'

const containerVariants = {
  hidden: {
    opacity: 0,
    x: '100vw'
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.75,
      duration: 1.25
    }
  },
  exit: {
    x: '-100vw',
    transition: { ease: 'easeInOut' }
  }
}

export const GameBoard = ({ clickHandler, numCards, time, toggle }) => {
  return (
    <motion.div className="container"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}>
      <div className="input-container">
        <label htmlFor="num-cards">Number of Pairs to Play With</label>
        <input id="num-cards" min="2" step="2" type="number" />
        <button onClick={clickHandler}>Deal</button>
      </div>
      <Timer time={time} toggle={toggle} />
      <CardsDisplay timerHandler={toggle} numberOfCards={numCards} />
    </motion.div>
  )
}

GameBoard.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  toggle: PropTypes.func.isRequired
}
