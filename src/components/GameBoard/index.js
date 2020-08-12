import React, { useEffect, useState } from 'react'
import api from 'api'
import { CardsDisplay } from './CardsDisplay'
import { Timer } from './Timer'

import './GameBoard.css'

export const GameBoard = () => {
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [timerIsRunning, setTimerIsRunning] = useState(false)

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

  useEffect(() => {
    if (timerIsRunning) {
      const intervalID = setInterval(() => {
        setTimeElapsed(timeElapsed + 1)
      }, 1000)

      // clean-up fxn
      return () => { clearInterval(intervalID) }
    }
  }, [timerIsRunning, timeElapsed])

  const handleTimerToggle = () => {
    setTimerIsRunning(!timerIsRunning)
  }

  const handleMatchedCards = (matchCardOne, matchCardTwo) => {
    // Replace original cards with matched cards
    setCards(() => cards.map(card => {
      if (card.id === matchCardOne.id) {
        return matchCardOne
      } else if (card.id === matchCardTwo.id) {
        return matchCardTwo
      }
      return card
    }))
  }

  const handleFlippedCards = (flippedCard) => {
    setCards(() => cards.map(card => card.id === flippedCard.id ? flippedCard : card))
  }

  const handleResetFlipped = () => {
    setCards(cards.map(card => {
      card.flipped = false
      return card
    }))
  }

  return (
    <div className="container">
      <h3 className="title">Concentration</h3>
      <Timer time={timeElapsed} />
      <CardsDisplay
        cards={cards}
        flipHandler={handleFlippedCards}
        isLoading={isLoading}
        matchedHandler={handleMatchedCards}
        resetHandler={handleResetFlipped}
        setCards={setCards}
        toggle={handleTimerToggle}
      />
    </div>
  )
}
