import { readFileSync } from 'node:fs'
import { createServer } from 'node:http'

const server = createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')

  try {
    const data = readFileSync('backend/users.json', 'utf-8') // Ensure the path is correct
    res.end(data)
  } catch (error) {
    res.statusCode = 500
    res.end(
      JSON.stringify({ message: 'Error reading file', error: error.message }),
    )
  }
})

const host = 'localhost'
const port = 3000

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`)
})
