import React from 'react'
import { Link } from 'react-router-dom'

export const HowToPlay = () => {

  return (
    <div className="container rules-container">
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
    </div>
  )
}
