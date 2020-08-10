import React from 'react'
import PropTypes from 'prop-types'

export const Timer = ({ toggle }) => {

  return (
    <h3>Timer</h3>
  )
}

Timer.propTypes = {
  toggle: PropTypes.bool.isRequired
}
