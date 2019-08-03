const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const bodyParser = require('body-parser')
const routes = require('./routes/index')
const users = require('./routes/users')
const app = express()
const debug = require('debug')('Nano-File-System-PoC:node')
const http = require('http')


// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'images/favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	next()
})

app.use('/', routes)
app.use('/users', users)

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found')
	err.status = 404
	next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use((err, req, res, next) => {
		res.status(err.status || 500)
		res.json({
		  message: err.message,
		  error: err
		});
	})
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
	res.status(err.status || 500)
	res.json({
	  message: err.message,
	  error: err
	});
})



/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = val => {
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

/**
 * Event listener for HTTP server "error" event.
 */

const onError = error => {
	if (error.syscall !== 'listen') {
		throw error
	}
	const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(`${bind} requires elevated privileges`)
			process.exit(1)
			break
		case 'EADDRINUSE':
			console.error(`${bind} is already in use`)
			process.exit(1)
			break
		default:
			throw error
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
	const addr = server.address()
	const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
	debug(`Listening on ${bind}`)
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

/**
 * Create HTTP server.
 */

const server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
console.log(`Server listening on https://${process.env.IP}:${port}`)
