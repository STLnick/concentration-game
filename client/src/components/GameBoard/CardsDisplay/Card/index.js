import React from 'react'
import PropTypes from 'prop-types'

import cardBackImg from '../../../../img/cardBack.png'

export const Card = ({ code, flipped, handler, id, imgSrc, matched, suit, value }) => {
  const btnStyle = {
    backgroundColor: '#1A4A1C',
    border: '2px solid #aaa',
    borderRadius: '5px',
    margin: 0,
    padding: 0
  }

  const imgStyle = {
    borderRadius: '5px',
    margin: '0.25rem'
  }

  const animateClass = matched ? 'flipOutX' : ''

  return <button
    className={matched ? 'matched' : null}
    data-code={code}
    data-id={id}
    disabled={matched ? true : null}
    onClick={handler}
    style={btnStyle}>
    <img
      alt={`${value} of ${suit}`}
      className={animateClass}
      src={flipped ? imgSrc : cardBackImg}
      style={imgStyle}
      width="100"
    />
  </button>
}

Card.propTypes = {
  code: PropTypes.string,
  flipped: PropTypes.bool,
  handler: PropTypes.func,
  id: PropTypes.number,
  imgSrc: PropTypes.string,
  matched: PropTypes.bool,
  suit: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}
