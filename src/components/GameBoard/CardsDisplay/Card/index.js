import React, { useEffect, useState } from 'react'

import api from 'api'

export const Card = () => {
  const [cards, setCards] = useState([])

  useEffect(() => {
    (async () => {
      console.log(await api.index())
    })()
  }, [])

  return (
    <p>I'm a Card</p>
  )
}
