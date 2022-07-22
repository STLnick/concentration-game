import dotenv from 'dotenv';
const { MongoClient, ServerApiVersion } = require('mongodb');

dotenv.config();

const client = new MongoClient(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  },
);

(async () => {
  client.connect();

  process.on('SIGINT', () => {
    client.close().then(() => {
      console.info('SIGINT received: DB connection is closing');

      // Avoid plugging up ports - ensures all processes are stopped
      process.exit(0);
    });
  });
})();

export default client;
