import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

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

export const HowToPlay = () => {

  return (
    <motion.div className="container rules-container"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}>
      <h2 className="rules-title">How To Play Concentration</h2>
      <div className="rules">
        <ul className="rules-list">
          <li className="rules-list-item">Pick the amount of pairs you want to play with</li>
          <li className="rules-list-item">Flip 2 cards at a time</li>
          <li className="rules-list-item">If those cards match they go away</li>
          <li className="rules-list-item">If they DON'T match they will flip back over in place</li>
          <li className="rules-list-item">Try to match all the pairs as fast as possible!</li>
        </ul>
      </div>
      <Link className="link" to="/">Welcome Page</Link>
      <Link className="link" to="/game">Start the Game</Link>
    </motion.div>
  )
}
