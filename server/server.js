import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import scores from './routes/scores';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

app.use('/scores', scores);

app.use;

app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port:${PORT}`);
});
