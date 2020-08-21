import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import api from 'api'

import { Card } from './Card'

import './CardsDisplay.css'

const cardsRepo = api('cards')

export const CardsDisplay = ({ timerHandler, numberOfCards }) => {
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()

  // Fetch cards and add needed properties to each
  useEffect(() => {
    (async () => {
      setIsLoading(true)

      const fetchedCards = await cardsRepo.index(numberOfCards)

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
  }, [numberOfCards])

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

  const flipHandler = ({ currentTarget: { dataset: { code, id } } }) => {
    timerHandler(true)

    const flippedCards = cards.filter(({ flipped, matched }) => flipped && !matched)

    if (flippedCards.length < 2 && flippedCards[0]?.id !== Number(id)) {
      setCards(truthifyCards('id', Number(id), 'flipped'))

      if (flippedCards[0]?.code === code) {
        setCards(truthifyCards('code', code, 'matched'))

        if (!cards.find(({ matched }) => !matched)) {
          timerHandler(false)
          const time = document.querySelector('.timer').textContent
          console.log(time)
          history.push('/gameover', time)
        }
      } else if (flippedCards[0]) {
        resetFlippedCards()
      }
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
  timerHandler: PropTypes.func,
  numberOfCards: PropTypes.number
}
