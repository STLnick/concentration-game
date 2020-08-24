import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import React from 'react'

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

export const Welcome = ({ scores }) => {
  return (
    <motion.div className="container"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}>
      <h1 className="welcome">Welcome to the Game!</h1>
      <div className="welcome-container">
        <Link className="link" to="/howtoplay">
          How To Play
        </Link>
        <Link className="link" to="/game">
          Start the Game
        </Link>
        <HighScores scores={scores} />
      </div>
    </motion.div>
  )
}
