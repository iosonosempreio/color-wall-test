const express = require("express")
const socket = require('socket.io')

const port = process.env.PORT || 3000;
const app = express()
app.use(express.static('public'))

const server = app.listen(port)
console.log("I am up and running!")

const io = socket(server);

const newConnection = (socket) => {
  const color = getRandomColor()
  console.log('new connection:', socket.client.id, color)
  socket.emit('color', color)

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
  const mouseMessage = (dataReceived) => {
    console.log(dataReceived)
    socket.broadcast.emit('mouseBroadcast', dataReceived)
  }
  socket.on('mouse', mouseMessage)
}

io.on('connection', newConnection)

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}