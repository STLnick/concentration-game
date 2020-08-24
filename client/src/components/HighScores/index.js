import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

import './HighScores.css'

const tableVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: { delay: 2, duration: 1 }
  }
}

export const HighScores = ({ scores }) => {

  const renderTableRows = () => {
    return scores.map(({ initials, pairs, time }, i) => {
      return (
        <tr key={i}>
          <td>{initials}</td>
          <td>{pairs}</td>
          <td>{time}</td>
        </tr>
      )
    })
  }

  return (
    <motion.table
      initial="hidden"
      animate="visible"
      variants={tableVariants}>
      <caption>High Scores</caption>
      <thead>
        <tr>
          <th>Initials</th>
          <th>Pairs</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {renderTableRows()}
      </tbody>
    </motion.table>
  )
}

HighScores.propTypes = {
  scores: PropTypes.array
}
