import express from 'express'

const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack !')
})

// Port to listen to
const PORT = 3003

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})