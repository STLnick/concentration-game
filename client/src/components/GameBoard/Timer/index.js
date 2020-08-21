import React from 'react'
import PropTypes from 'prop-types'
import { secondsToMinutesAndSeconds } from 'utils'

import './Timer.css'

export const Timer = ({ time }) => {
  return (
    <h3 className="timer" style={{
      'color': 'white'
    }}> {secondsToMinutesAndSeconds(time)}</h3>
  )
}

Timer.propTypes = {
  time: PropTypes.number.isRequired
}
