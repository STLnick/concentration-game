import React from 'react'
import PropTypes from 'prop-types'

export const Card = ({ flipped, handler, imgSrc, index, matched, suit, value }) => {
  const btnStyle = {
    margin: 0,
    padding: 0
  }

  const imgStyle = {
    borderRadius: '5px',
    margin: '0.25rem'
  }

  const divStyle = {
    backgroundColor: '#eee',
    border: '2px solid #aaa',
    borderRadius: '5px',
    display: 'inline-block',
    height: '137px',
    margin: '0.25rem',
    textAlign: 'center',
    width: '98px'
  }

  const matchedDiv = <div style={divStyle}></div>

  const cardImg = <button onClick={handler} style={btnStyle}><img
    alt={`${value} of ${suit}`}
    data-index={index}
    src={flipped ? imgSrc : 'https://source.unsplash.com/random/100x139'}
    style={imgStyle}
    width="100"
  /></button>

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
