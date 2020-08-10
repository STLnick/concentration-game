import React from 'react'
import PropTypes from 'prop-types'

export const Card = ({ flipped, handler, imgSrc, index, matched, suit, value }) => {


  return (
    <img
      alt={`${value} of ${suit}`}
      data-index={index}
      onClick={handler}
      src={flipped ? imgSrc : 'https://source.unsplash.com/random/100x139'}
      width="100"
    />
  )
}

Card.propTypes = {
  flipped: PropTypes.bool,
  handler: PropTypes.func,
  imgSrc: PropTypes.string,
  matched: PropTypes.bool,
  suit: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

Card.defaultProps = {
  matched: false
}
