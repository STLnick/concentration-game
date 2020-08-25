import { ObjectId } from 'mongodb';
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

export const replaceScore = async (scoreToDelete, newScore) => {
  try {
    return await client.db('highscores').collection('scores').replaceOne({ _id: ObjectId(scoreToDelete._id) }, newScore);
  } catch (err) {
    throw new Error(err);
  }
};
