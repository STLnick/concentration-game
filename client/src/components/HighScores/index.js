import React from 'react'
import PropTypes from 'prop-types'

import './HighScores.css'

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
    <table>
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
    </table>
  )
}

HighScores.propTypes = {
  scores: PropTypes.array
}
