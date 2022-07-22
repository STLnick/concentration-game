export default (purpose) => purpose === 'cards' ? ({
  async index(numOfCards) {
    // Testing 'All Matched condition'
    const deckRes = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    const deck = await deckRes.json()

    // Changed count=12 to count=4 just to test all matched condition
    const cardsRes = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=${numOfCards}`)
    const cards = await cardsRes.json()

    return cards.cards
  }
}) :
  ({
    async addScore(newScore) {
      const res = await fetch('https://game-concentration.herokuapp.com/scores/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newScore)
      })
      return await res.json()
    },
    async getScores() {
      const res = await fetch('https://game-concentration.herokuapp.com/scores/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return await res.json()
    },
    async replaceScore(scoreToDelete, newScore) {
      const res = await fetch('https://game-concentration.herokuapp.com//scores/replace', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ scoreToDelete, newScore })
      })
      return await res.json()
    }
  })
