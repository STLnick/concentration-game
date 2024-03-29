const express = require('express');

const { addScore, getScores, replaceScore } = require('../db');

const router = express.Router();

router.get('/', async (_, res) => {
  res.status(200);
  res.send(await getScores());
});

router.post('/add', async (req, res) => {
  res.status(201);
  res.json(await addScore(req.body));
});

router.put('/replace', async (req, res) => {
  res.status(204);
  res.json(await replaceScore(req.body));
});

module.exports = router;
