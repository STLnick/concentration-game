import React from 'react'
import PropTypes from 'prop-types'

import { HighScores } from '../HighScores'

export const GameOver = ({ handler, scores }) => {

  return (
    <div className="container">
      <h2>Game Over</h2>
      <form onSubmit={handler}>
        <label htmlFor="user-name">Enter Your Name</label>
        <input id="user-name" placeholder="Bobby Boucher" type="text" />
        <button id="form-btn" type="submit">Submit</button>
      </form>
      <HighScores scores={scores} />
    </div>
  )
}

GameOver.propTypes = {
  handler: PropTypes.func,
  scores: PropTypes.array
}
