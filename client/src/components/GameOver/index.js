import PropTypes from 'prop-types'
import React from 'react'
import { StyleRoot } from 'radium';
import { Link } from 'react-router-dom'
import { animations } from 'utils'

import { HighScores } from '../HighScores'

export const GameOver = ({ handler, scores }) => {
  return (
    <div className="container">
      <StyleRoot>
        <h2 className="title" style={animations.lightSpeedIn}>Game Over</h2>
      </StyleRoot>
      <form onSubmit={handler}>
        <label htmlFor="user-name">Enter Your Initials</label>
        <input id="user-name" placeholder="Bobby Boucher" type="text" />
        <button id="form-btn" type="submit">Submit</button>
      </form>
      <Link className="link-small" to="/">Back to Welcome Page</Link>
      <StyleRoot>
        <div style={animations.fadeIn}>
          <HighScores scores={scores} />
        </div>
      </StyleRoot>
    </div>
  )
}

GameOver.propTypes = {
  handler: PropTypes.func,
  scores: PropTypes.array
}
