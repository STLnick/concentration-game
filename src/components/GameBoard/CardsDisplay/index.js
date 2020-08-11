import React, { useEffect, useState } from 'react'

import api from 'api'

import { Card } from './Card'

import './CardsDisplay.css'

export const CardsDisplay = () => {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [matchedCards, setMatchedCards] = useState([])

  useEffect(() => {
    (async () => {
      setIsLoading(true)

      const fetchedCards = await api.index()

      // Duplicate cards, shuffle Cards and assign new properties
      const shuffledCardsWithDups = [...JSON.parse(JSON.stringify(fetchedCards)), ...JSON.parse(JSON.stringify(fetchedCards))]
        // Assign random sort num
        .map(card => {
          card.sortNum = Math.random()
          return card
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

  useEffect(() => {
    if (flippedCards[1]) {
      setTimeout(checkForMatch, 1500)
    }
  }, [flippedCards])

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
    if (!flippedCards[1]) {
      const flippedCard = cards.find(card => card.id === Number(dataset.id))

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
