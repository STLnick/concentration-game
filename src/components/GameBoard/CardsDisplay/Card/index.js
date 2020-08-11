import React from 'react'
import PropTypes from 'prop-types'

export const Card = ({ flipped, handler, imgSrc, index, matched, suit, value }) => {
  const imgStyle = {
    margin: '0.25rem'
  }

  const divStyle = {
    backgroundColor: '#eee',
    border: '1px solid black',
    borderRadius: '5px',
    display: 'inline-block',
    height: '138px',
    margin: '0.25rem',
    textAlign: 'center',
    width: '99px'
  }

  const matchedDiv = <div style={divStyle}></div>

  const cardImg = <img
    alt={`${value} of ${suit}`}
    data-index={index}
    onClick={handler}
    src={flipped ? imgSrc : 'https://source.unsplash.com/random/100x139'}
    style={imgStyle}
    width="100"
  />

  return matched ? matchedDiv : cardImg
}

Card.propTypes = {
  flipped: PropTypes.bool,
  handler: PropTypes.func,
  imgSrc: PropTypes.string,
  index: PropTypes.number,
  matched: PropTypes.bool,
  suit: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}
