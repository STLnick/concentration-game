import express from 'express'

import { addScore, getScores } from '../db/index'

const router = express.Router()

router.get('/', async (_, res) => {
  res.status(200)
  res.send(await getScores())
})

router.post('/add', async (req, res) => {
  res.status(201)
  res.json(await addScore(req.body))
})

export default router
