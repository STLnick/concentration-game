import client from './client';

export const getScores = async () => {
  try {
    return await client.db('highscores').collection('scores').find().toArray();
  } catch (err) {
    throw new Error(err);
  }
};

export const addScore = async (score) => {
  try {
    return await client.db('highscores').collection('scores').insertOne(score);
  } catch (err) {
    throw new Error(err);
  }
};
