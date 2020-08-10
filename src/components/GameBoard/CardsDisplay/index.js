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

  return (
    <div>
      <h3>Cards Display</h3>
      <Card />
    </div>
  )
}
