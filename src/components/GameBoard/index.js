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
        // Assign random sort num
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
      setTimeout(() => {
        setTimeElapsed(timeElapsed + 1)
      }, 1000)
    }
  }, [timerIsRunning, timeElapsed])

  const handleTimerToggle = () => {
    setTimerIsRunning(!timerIsRunning)
  }

  return (
    <div className="container">
      <h3 className="title">Concentration</h3>
      <Timer time={timeElapsed} />
      <CardsDisplay
        cards={cards}
        isLoading={isLoading}
        setCards={setCards}
        toggle={handleTimerToggle}
      />
    </div>
  )
}
