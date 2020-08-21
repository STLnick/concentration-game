import React from 'react'
import { Link } from 'react-router-dom'

import { HighScores } from '../HighScores'

export const Welcome = ({ scores }) => {
  return (
    <div className="container welcome-container">
      <h1 className="welcome">Welcome to Concentration!</h1>
      <div>
        {/* link to instructions */}
      </div>
      <div>
        <HighScores scores={scores} />
      </div>
      <Link className="link" to="/howtoplay">How To Play</Link>
      <Link className="link" to="/game">Start the Game</Link>
    </div>
  )
}
