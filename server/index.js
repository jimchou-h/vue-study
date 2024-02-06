const app = require('./app')
const http = require('http')

const port = getPort(process.env.PORT || '3000')
app.set('port', port)

const server = http.createServer(app)

server.listen(port)

function getPort(val) {
  const port = parseInt(val, 10)
  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    return port
  }
  return false
}
