import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { Card } from './Card'

import './CardsDisplay.css'

export const CardsDisplay = ({ cards, isLoading, setCards, toggle }) => {
  const [firstFlipDone, setFirstFlipDone] = useState(false)
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])

  // If 2 cards are flipped check for match and flip all back over after 1.5s
  useEffect(() => {
    if (flippedCards[1]) {
      setTimeout(checkForMatch, 1500)
    }
  }, [flippedCards])

  // Stop timer if all cards are matched
  useEffect(() => {
    if (cards.length !== 0 && matchedCards.length === cards.length) {
      toggle()
    }
  }, [matchedCards])

  // Start timer on the first card flip
  useEffect(() => {
    if (firstFlipDone)
      toggle()
  }, [firstFlipDone])

  const checkForMatch = () => {
    // If cards inside of 'flippedCards' have matching values
    const flippedCard1 = flippedCards[0]
    const flippedCard2 = flippedCards[1]
    const isMatch = flippedCard1.code === flippedCard2.code

    if (isMatch) {
      // Change matched values to true
      flippedCard1.matched = true
      flippedCard2.matched = true

      // Place 'matching cards' into 'matchedCards'
      setMatchedCards([...matchedCards, flippedCard1, flippedCard2])

      // Replace original cards with matched cards
      setCards(() => cards.map(card => {
        if (card.id === flippedCard1.id) {
          return flippedCard1
        } else if (card.id === flippedCard2.id) {
          return flippedCard2
        }
        return card
      }))
    }

    setTimeout(resetFlipped, 1000)
  }

  const resetFlipped = () => {
    setCards(cards.map(card => {
      card.flipped = false
      return card
    }))

    setFlippedCards([])
  }

  const handleFlip = ({ target: { dataset } }) => {
    if (!firstFlipDone)
      setFirstFlipDone(true)

    if (!flippedCards[1]) {
      const flippedCard = cards.find(card => card.id === Number(dataset.id))
    // If there aren't 2 cards flipped already AND the card isn't matched
    // We know it's not matched if it doesn't have 'matched' class on button

      flippedCard.flipped = !flippedCard.flipped

      setCards(() => cards.map(card => card.id === flippedCard.id ? flippedCard : card))

      setFlippedCards(() => cards.filter(card => card.flipped))
    }
  }

  const renderCards = () => {
    return cards.map(({ code, flipped, id, image, matched, suit, value }) => {
      return <Card
        code={code}
        flipped={flipped}
        handler={handleFlip}
        id={id}
        imgSrc={image}
        key={id}
        matched={matched}
        suit={suit}
        value={value}
      />
    })
  }

  return (
    <div className="cards">
      {isLoading ? <h4 className="loading-msg">Loading Cards...</h4> : renderCards()}
    </div>
  )
}

CardsDisplay.propTypes = {
  cards: PropTypes.array,
  isLoading: PropTypes.bool,
  setCards: PropTypes.func,
  toggle: PropTypes.func
}
