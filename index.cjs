const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const PORT = 4200

const { Server } = require("socket.io")
const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(PORT, () => {
  console.log(`list3ning on p0rt ${PORT}`)
})