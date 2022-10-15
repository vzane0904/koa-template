import Debug from 'debug'
import http from 'http'
import app from '../app'
import env from 'dotenv'
const debug = Debug('demo:server')
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

env.config({ path: '.env' })
const port = normalizePort(process.env.PORT || '3000')

/**
 * Event listener for HTTP server "error" event.
 */
const server = http.createServer(app.callback())
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => {
  console.log(`server running on http://localhost:${port}`)
})

function onError(error: { syscall: string; code: any }) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr: any = server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Listening on ' + bind)
}

server.on('error', onError)
server.on('listening', onListening)
