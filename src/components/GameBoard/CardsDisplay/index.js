import React, { useEffect, useState } from 'react'

import api from 'api'

import { Card } from './Card'

export const CardsDisplay = () => {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])

  useEffect(() => {
    (async () => {
      const fetchedCards = await api.index()

      setCards(() => fetchedCards.map(card => {
        card.flipped = false
        card.matched = false
        return card
      }))
    })()
  }, [])

  const handleCardClick = (e) => {
    const flippedCard = cards[e.target.dataset.index]

    flippedCard.flipped = !flippedCard.flipped

    setCards(() => cards.map(card => cards.indexOf(card) === cards.indexOf(flippedCard) ? flippedCard : card))

    setFlippedCards(() => cards.filter(card => card.flipped))
  }

  const renderCards = () => {
    return cards.map(({ flipped, image, matched, suit, value }, i) => {
      return <Card
        flipped={flipped}
        handler={handleCardClick}
        imgSrc={image}
        index={i}
        key={i}
        matched={matched}
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
