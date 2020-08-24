import cors from 'cors';
import express from 'express';

import scores from './routes/scores';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

app.use('/scores', scores);

app.listen(PORT, () => {
  console.log(`Server is running on Port:${PORT}`);
});
