export default {
  async index() {
    const res = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    return await res.json()
  }
}
