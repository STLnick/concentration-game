import cors from 'cors';
import express from 'express';

import scores from './routes/scores';

const app = express();

// testing
app.get('/', (_, res) => {
  res.send('<h1>Hello from Express Server!</h1>');
});

app.use(cors());
app.use(express.json());

app.use('/scores', scores);

app.listen(process.env.PORT || 3000);
