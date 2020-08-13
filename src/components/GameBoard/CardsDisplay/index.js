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

  const truthifyCards = (propToCompare, compareVal, propToChange) => {
    return cards.map(card => {
      if (card[propToCompare] === compareVal) {
        card[propToChange] = true
      }
      return card
    })
  }

  const resetFlippedCards = () => {
    setTimeout(() => setCards(cards.map(card => {
      card.flipped = false
      return card
    })), 1000)
  }

  const checkWinCondition = () => cards.length === cards.filter(({ matched }) => matched).length

  const flipHandler = ({ currentTarget: { dataset: { code, id } } }) => {
    handler(true)

    const flippedCards = cards.filter(({ flipped }) => flipped)

    if (flippedCards.length < 2) {
      setCards(truthifyCards('id', Number(id), 'flipped'))

      if (flippedCards[0]?.code === code) {
        setCards(truthifyCards('code', code, 'matched'))
      }
    }

    if (flippedCards[0]) {
      resetFlippedCards()
    }

    if (checkWinCondition()) {
      handler(false)  // Stop Timer if won
    }
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
