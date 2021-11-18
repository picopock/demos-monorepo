'use strict'

var net = require('net')

var socketList = []

var server = net.createServer()
// 当server 开始监听端口后触发事件
server.on('listening', () => {
  console.log('listening.')
})
// 客户端连接成功后触发
server.on('connection', socket => {
  socketList.push(socket)
  socket.write('Hello')
  socket.end()
})

server.on('error', err => {
  console.log('error: ', err)
})

// 服务器关闭时触发
server.on('close', () => {
  console.log('server closed.')
})

server.listen(8000, () => {
  // 触发 listening 事件
  console.log('server started at port 8000')
})
