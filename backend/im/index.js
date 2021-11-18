'use strict'

const path = require('path')
const http = require('http')
const SocketIo = require('socket.io')
const Koa = require('koa')
const serve = require('koa-static')
const cors = require('@koa/cors')

const app = new Koa()
const server = http.Server(app.callback())
const serveRoot = path.resolve(__dirname, 'public')

app.use(cors())
app.use(async (ctx, next) => {
  await next()
  const resTime = ctx.response.get('X-Response-Time')
  console.log(`${ctx.method} ${ctx.url} - ${resTime}`)
})

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

app.use(
  serve(serveRoot, {
    maxAge: 1000 * 60 * 60 * 24 * 10
  })
) // static file

app.use(async ctx => {
  ctx.body = 'Hello World'
})

const io = SocketIo(server, {
  pingTimeout: 1000 * 10, // default 1000 * 5, 超时时间
  pingInterval: 1000 * 2, // default 1000 * 25 ping 的频率
  upgradeTimeout: 1000 * 10, // default 1000 * 10,
  transports: ['websocket' /* , 'polling' */],
  allowUpgrades: false, // default true, 传输方式是否允许升级
  httpCompression: true, // 是否压缩
  path: '/ws/test', // default /socket.io	name of the path to capture
  serveClient: false //是否提供客户端socket.io.js, default true
})

const nsp = io.of('/abc')

nsp.use((socket, next) => {
  console.log(socket.request.headers.cookie, '123')
  if (socket.request.headers.cookie) {
    return next()
  }
  next(new Error('Authentication error'))
})

nsp.on('connection', socket => {
  console.log('a user connected')
  socket.on('disconnect', function() {
    console.log('user disconnected')
  })
})

server.listen(8080, () => {
  console.log('server started at %s:%s', server.address().address, server.address().port)
})
