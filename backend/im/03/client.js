'use strict'

var net = require('net')

var client = net.connect({ port: 8000 })

// dns 查询成功后触发
client.on('lookup', () => {
  console.log('lookup')
})

client.on('connect', () => {
  console.log('connect to Server success')
})
client.on('timeout', () => {
  console.log('connect to Server timeout')
})
client.on('drain', () => {
  console.log('drain.')
})
client.on('end', () => {
  console.log('end.')
})
client.on('data', data => {
  console.log('received data: ', data.toString())
})
client.on('error', err => {
  console.log('client error: ', err)
})
client.on('close', flag => {
  console.log('close.', flag)
})
