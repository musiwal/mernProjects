import { createServer } from 'http'
import { MongoClient } from 'mongodb'

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbname = 'ch2'

async function startServer() {
  try {
    await client.connect()
    console.log('Connected to MongoDB!')
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message)
    return // Stop if the connection fails
  }

  const server = createServer(async (req, res) => {
    try {
      const db = client.db(dbname)
      const users = db.collection('users')
      const userslist = await users.find().toArray()

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ users: userslist }))
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Failed to retrieve data' }))
      console.error('Error retrieving data:', err.message)
    }
  })

  const host = 'localhost'
  const port = 3003

  server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`)
  })

  // Close the MongoDB connection when the process is terminated
  process.on('SIGINT', async () => {
    await client.close()
    console.log('MongoDB connection closed')
    process.exit(0)
  })
}

startServer()
