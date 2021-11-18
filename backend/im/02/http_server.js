var http = require('http')

var server = http.createServer((req, res) => {
  res.write('Hello, from http:')
  res.end()
})

server.listen(8001, () => {
  console.log('http server started at port 8001')
})
