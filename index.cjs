const express = require('express')
const app = express()
const http = require('http')
const path = require('path')
const server = http.createServer(app)
const PORT = 4200

const { Server } = require("socket.io")
const io = new Server(server)

class ConnectedUser {
  constructor(socket) {
    this.id_ = _USERS.length
    this.pos_ = [(Math.random() * 20), 0, Math.random() * 20]
    this.socket_ = socket
    this.socket_.on('pos', (d) => {
      this.pos_ = [...d]
      this.SpamEveryone_()
    })
    this.SpamEveryone_()
  }
  SpamEveryone_() {
    this.socket_.emit('pos', [this.id_, this.pos_])

    for (let i= 0; i < _USERS.length; ++i) {
      _USERS[i].socket_.emit('pos', [this.id_, this.pos_])
      this.socket_.emit(_USERS[i].id_, _USERS[i].pos_)
      // console.log(_USERS)
    }
  }

}

const _USERS = []

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})


io.on('connection', (socket) => {
    console.log('a user connected')
    _USERS.push(new ConnectedUser(socket))
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(PORT, () => {
  console.log(`list3ning on p0rt ${PORT}`)
})