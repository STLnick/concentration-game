const cors = require('cors');
const express = require('express');

const scores = require('./routes/scores');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/scores', scores);

app.listen(process.env.PORT || 3000);
