import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import utils from 'utils'

import './Timer.css'

export const Timer = ({ toggle }) => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    while (toggle) {
      const intervalID = setInterval(() => {
        setTime(() => time + 1)
      }, 1000)
      // Cleanup function
      return () => {
        clearInterval(intervalID)
      }
    }
  })

  return (
    <h3 className="timer" style={{
      'color': 'white'
    }}> {utils.secondsToMinutesAndSeconds(time)}</h3>
  )
}

Timer.propTypes = {
  toggle: PropTypes.bool
}

Timer.defaultProps = {
  toggle: false
}
