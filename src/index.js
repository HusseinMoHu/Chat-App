const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

// let count = 0

io.on('connection', (socket) => {
  console.log('New Websocket connection')

  // emit to Particular connection
  socket.emit('message', 'Welcome!')
  // emit to everybody BUT that  particular connection
  socket.broadcast.emit('message', 'A new user has joined!')

  socket.on('sendMessage', (message) => {
    // emit to everybody
    io.emit('message', message)
  })

  // disconnect is built-in event, So no need to bind it to client side
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left!')
  })
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`)
})
