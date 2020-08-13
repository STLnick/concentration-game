import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from 'api'

import { Card } from './Card'

import './CardsDisplay.css'

export const CardsDisplay = ({ handler }) => {
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Fetch cards and add needed properties to each
  useEffect(() => {
    (async () => {
      setIsLoading(true)

      const fetchedCards = await api.index()

      // Duplicate cards, shuffle Cards and assign new properties
      const shuffledCardsWithDups = fetchedCards.concat(Array.from(fetchedCards))
        // Assign random sort num and remove reference to original object
        .map(card => {
          const cardCopy = { ...card }
          cardCopy.sortNum = Math.random()
          return cardCopy
        })
        // Sort based on new sort num
        .sort((a, b) => a.sortNum - b.sortNum)
        // Return a 'card' without the sort num or extra images but with new properties: id, flipped, matched
        .map(({ code, image, suit, value }, index) => ({ code, flipped: false, id: index, image, matched: false, suit, value }))

      // Set cards state
      setCards(shuffledCardsWithDups)

      setIsLoading(false)
    })()
  }, [])

  const flipHandler = ({ currentTarget: { dataset } }) => {
    handler(true)

    // Get the code and id from dataset
    const { code, id } = dataset
    // Filter out flipped cards
    const flippedCards = cards.filter(({ flipped }) => flipped)
    // Check if any card are flipped
    // If no flipped cards we can find and flip card that matches dataset id (setCards)
    if (!flippedCards.length) {
      setCards(cards.map(card => {
        if (card.id === id) {
          card.flipped = true
        }
        return card
      }))
    }

    // As long as there are less than 2 cards and card.id is not the same


  }

  const renderCards = () => {
    return cards.map(({ code, flipped, id, image, matched, suit, value }) => {
      return <Card
        code={code}
        flipped={flipped}
        handler={flipHandler}
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
  handler: PropTypes.func
}
