export default (purpose) => purpose === 'cards' ? ({
  async index(numOfCards) {
    // const deckRes = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    // const deck = await deckRes.json()

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
      const res = await fetch('http://localhost:5000/scores/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newScore)
      })
      return await res.json()
    },
    async getScores() {
      const res = await fetch('http://localhost:5000/scores/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return await res.json()
    }
  })
