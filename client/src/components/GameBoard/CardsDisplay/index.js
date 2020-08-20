import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from 'api'

import { Card } from './Card'

import './CardsDisplay.css'

export const CardsDisplay = ({ timerHandler, numberOfCards }) => {
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Fetch cards and add needed properties to each
  useEffect(() => {
    (async () => {
      setIsLoading(true)

      // If game won message is present remove it
      if (document.querySelector('.game-notification').classList.contains('game-won')) {
        document.querySelector('.game-notification').classList.remove('game-won')
      }

      const fetchedCards = await api.index(numberOfCards)

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
          // Show notification that game is over
          document.querySelector('.game-notification').classList.add('game-won')
          // Show form for user to enter name
          document.querySelector('form').classList.add('game-won-form')
        }
      } else if (flippedCards[0]) {
        resetFlippedCards()
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    document.querySelector('form').classList.remove('game-won-form')
    const userInfo = document.querySelector('.user-info')
    // Put info inside user-info div
    const name = e.target.querySelector('input').value
    const time = document.querySelector('.timer').textContent
    console.log(name, time)
    userInfo.innerHTML += `<div class="user">
      <h3>${name}</h3>  ---  <h3>${time}</h3>
    </div>`
    userInfo.classList.add('active-user-info')
    // Hide form

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
    <div>
      <div className="game-notification">You Win!</div>
      <div className="user-info">
        <h5>Recent Scores</h5>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user-name">Enter Your Name</label>
        <input id="user-name" placeholder="Bobby Boucher" type="text" />
        <button type="submit">Submit</button>
      </form>
      <div className="cards">
        {isLoading ? <h4 className="loading-msg">Loading Cards...</h4> : renderCards()}
      </div>
    </div>
  )
}

CardsDisplay.propTypes = {
  timerHandler: PropTypes.func,
  numberOfCards: PropTypes.number
}