import React, { useEffect, useState } from 'react'

import api from 'api'

import { Card } from './Card'

export const CardsDisplay = () => {
  const [cards, setCards] = useState([])

  useEffect(() => {
    (async () => {
      const fetchedCards = await api.index()

      setCards(() => fetchedCards.map(card => {
        card.flipped = false
        return card
      }))
    })()
  }, [])

  const renderCards = () => {
    return cards.map(({ flipped, image, suit, value }, i) => {
      return <Card
        flipped={flipped}
        handler={handleCardClick}
        imgSrc={image}
        index={i}
        key={i}
        suit={suit}
        value={value} />
    })
  }

  return (
    <div>
      <h3>Cards Display</h3>
      {renderCards()}
    </div>
  )
}
