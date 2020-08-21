import React from 'react'
import { StyleRoot } from 'radium';
import { Link } from 'react-router-dom'
import { animations } from 'utils'

import { HighScores } from '../HighScores'

export const Welcome = ({ scores }) => {
  return (
    <div className="container welcome-container">
      <StyleRoot>
        <h1 className="welcome" style={animations.lightSpeedIn}>Welcome to Concentration!</h1>
      </StyleRoot>
      <div>
        {/* link to instructions */}
      </div>
      <StyleRoot>
        <div style={animations.fadeIn}>
          <HighScores scores={scores} />
        </div>
      </StyleRoot>
      <Link className="link" to="/howtoplay">
        How To Play
        </Link>
      <Link className="link" to="/game">
        Start the Game
      </Link>
    </div>
  )
}
