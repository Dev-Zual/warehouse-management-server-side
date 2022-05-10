const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

// midleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2puf3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const serviceCollection = client.db('warehousedb1').collection('service');

    app.get('/service', async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('warehouse server running');
});

app.listen(port, () => {
  console.log('server running at', port);
});
