const { ObjectId } = require('mongodb');
const client = require('./client');

module.exports.getScores = async () => {
  try {
    return await client.db('highscores').collection('scores').find().toArray();
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.addScore = async (score) => {
  try {
    return await client.db('highscores').collection('scores').insertOne(score);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.replaceScore = async ({ scoreToDelete, newScore }) => {
  try {
    return await client.db('highscores').collection('scores')
      .replaceOne({ _id: ObjectId(scoreToDelete._id) }, newScore);
  } catch (err) {
    throw new Error(err);
  }
};
