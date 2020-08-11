import React from 'react'
import PropTypes from 'prop-types'

import './Timer.css'

export const Timer = ({ time, toggle }) => {

  return (
    <h3 className="timer">{time}</h3>
  )
}

Timer.propTypes = {
  time: PropTypes.string,
  toggle: PropTypes.bool.isRequired
}
