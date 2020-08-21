import React from 'react'

import { HighScores } from '../HighScores'

export const GameOver = () => {

  const handleSubmit = (e) => {
    e.preventDefault()

    // Get user name
    const name = e.target.querySelector('input').value

    // TODO: Get user time

    // TODO: Update state with initials and time

  }

  return (
    <div className="container">
      <h2>Game Over</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user-name">Enter Your Name</label>
        <input id="user-name" placeholder="Bobby Boucher" type="text" />
        <button type="submit">Submit</button>
      </form>
      <HighScores />
    </div>
  )
}
