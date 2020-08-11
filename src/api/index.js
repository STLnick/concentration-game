export default {
  async index() {
    const deckRes = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    const deck = await deckRes.json()

    const cardsRes = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=12`)
    const cards = await cardsRes.json()

    return cards.cards
  }
}
