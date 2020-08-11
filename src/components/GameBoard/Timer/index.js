import React from 'react'
import PropTypes from 'prop-types'

import './Timer.css'

export const Timer = ({ time }) => {

  const formatTimeLeft = () => {
    const minutes = Math.floor(time / 60)
    let seconds = time % 60
    if (seconds === 0) {
      seconds = '00'
    } else if (seconds < 10) {
      seconds = `0${seconds}`
    }

    return `${minutes}:${seconds}`
  }

  return (
    <h3 className="timer">{formatTimeLeft(time)}</h3>
  )
}

Timer.propTypes = {
  time: PropTypes.number
}
