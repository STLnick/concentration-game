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

      setCards(() => fetchedCards.map((card, index) => {
        card.id = index
        card.flipped = false
        card.matched = false
        return card
      }))
    })()
  }, [])

  useEffect(() => {
    checkForMatch()
  }, [flippedCards])

  // Test 'matching' cards using just the card value not suit
  // TODO: Change matching logic to take into account the card suit as well
  const checkForMatch = () => {
    // If cards inside of 'flippedCards' have matching values
    let isMatch = false
    let matchedCard1 = null
    let matchedIndex1 = null
    let matchedCard2 = null
    let matchedIndex2 = null

    flippedCards.forEach((card, i) => {
      matchedCard1 = card
      matchedIndex1 = i
      flippedCards.forEach((card2, i2) => {
        if (i !== i2 && card.value === card2.value) {
          isMatch = true
          matchedCard2 = card2
          matchedIndex2 = i2
          // Change the matching cards property 'flipped: false' and 'matched: true'
          matchedCard1.flipped = false
          matchedCard2.flipped = false
          matchedCard1.matched = true
          matchedCard2.matched = true
        }
      })
    })

    if (isMatch) {
      // Place 'matching cards' into 'matchedCards'
      setMatchedCards([...matchedCards, matchedCard1, matchedCard2])

      let newCards = cards.map(card => cards.indexOf(card) === matchedIndex1 ? matchedCard1 : card)
      newCards = cards.map(card => cards.indexOf(card) === matchedIndex2 ? matchedCard2 : card)

      setCards(newCards)
    }

  }

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
