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
      delay: 0.75,
      duration: 1.25,
      when: 'beforeChildren',
      staggerChildren: 0.4
    }
  },
  exit: {
    x: '-100vw',
    transition: { ease: 'easeInOut' }
  }
}

const listVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1
  }
}

export const HowToPlay = () => {

  return (
    <motion.div className="container rules-container"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}>
      <h3 className="sub-title">How To Play Concentration</h3>
      <div className="rules">
        <ul className="rules-list">
          <motion.li className="rules-list-item"
            variants={listVariants}>
            Pick the amount of pairs you want to play with
          </motion.li>
          <motion.li className="rules-list-item"
            variants={listVariants}>
            Flip 2 cards at a time
          </motion.li>
          <motion.li className="rules-list-item"
            variants={listVariants}>
            If those cards match they go away
          </motion.li>
          <motion.li className="rules-list-item"
            variants={listVariants}>
            If they DON'T match they will flip back over in place
          </motion.li>
          <motion.li className="rules-list-item"
            variants={listVariants}>
            Try to match all the pairs as fast as possible!
          </motion.li>
        </ul>
      </div>
      <Link className="link" to="/">Welcome Page</Link>
      <Link className="link" to="/game">Start the Game</Link>
    </motion.div>
  )
}
