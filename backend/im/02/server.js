'use strict'
var net = require('net')

var server = net.createServer()
server.on('connection', socket => {
  console.log('connected')
  socket.write('Hello world')
  socket.end()
})

server.on('error', err => {
  console.error(err)
})

server.listen(8000, () => {
  console.log('server started at localhost:8000')
})
