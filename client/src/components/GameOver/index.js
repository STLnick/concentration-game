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
      delay: 1,
      duration: 1.25
    }
  },
  exit: {
    x: '-100vw',
    transition: { ease: 'easeInOut' }
  }
}

export const GameOver = ({ handler, scores }) => {
  return (
    <motion.div className="container"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}>
      <h2 className="title">Game Over</h2>
      <form onSubmit={handler}>
        <label htmlFor="user-name">Enter Your Initials</label>
        <input id="user-name" placeholder="Bobby Boucher" type="text" />
        <button id="form-btn" type="submit">Submit</button>
      </form>
      <Link className="link-small" to="/">Back to Welcome Page</Link>
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
