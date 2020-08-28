import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import scores from './routes/scores';

dotenv.config();

const app = express();

// testing
app.get('/', (_, res) => {
  res.send('<h1>Hello from Express Server!</h1>');
});

app.use(cors());
app.use(express.json());

const PORT = 5000;

app.use('/scores', scores);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port:${PORT}`);
});
