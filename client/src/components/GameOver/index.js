import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import { HighScores } from '../HighScores'

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

export const GameOver = ({ handler, scores }) => {
  // TODO: Logic to add a score ONLY IF it is better than a Top 10 score

  // TODO: If we have 10 scores and a new high score is achieved we should DELETE the slowest of the Top 10 and then INSERT the new score

  return (
    <motion.div className="container"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}>
      <h3 className="sub-title">Game Over</h3>
      <form onSubmit={handler}>
        <label htmlFor="user-name">Enter Your Initials</label>
        <input id="user-name" placeholder="Bobby Boucher" type="text" />
        <button id="form-btn" type="submit">Submit</button>
      </form>
      <Link className="link-small" to="/">Back to Welcome Page</Link>
      <Link className="link-small" to="/game">Play Again</Link>
      <div>
        <HighScores scores={scores} />
      </div>
    </motion.div>
  )
}

GameOver.propTypes = {
  handler: PropTypes.func,
  scores: PropTypes.array
}
