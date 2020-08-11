import React from 'react'
import PropTypes from 'prop-types'

import './Timer.css'

export const Timer = ({ time, toggle }) => {

  const formatTimeLeft = () => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    return `${minutes}:${seconds === 0 ? '00' : seconds}`
  }

  return (
    <h3 className="timer">{formatTimeLeft(time)}</h3>
  )
}

Timer.propTypes = {
  time: PropTypes.string,
  toggle: PropTypes.bool.isRequired
}
