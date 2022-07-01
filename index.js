const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.khb8i.mongodb.net/?retryWrites=true&w=majority`;


// code of client

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        await client.connect();
        const taskCollection = client.db('tasks_work').collection('dailywork');


        app.get('/task', async (req, res) => {
            const query = {};
            const cursor = taskCollection.find(query);
            const tasks = await cursor.toArray();
            res.send(tasks)
        })


        // get from client side
        // new

        app.post('/task', async (req, res) => {
            const newTask = req.body;
            const result = await taskCollection.insertOne(newTask);
            res.send(result)
        })
    }

    finally {

    }

}

run().catch(console.dir)



app.get('/', (req, res) => {
    res.send('hello how are you')
})

app.listen(port, () => {
    console.log(`i am listening from port ${port}`)
})