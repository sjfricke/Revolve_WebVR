var express = require('express');
var app = express();

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var http = require('http');
var server = require('http').createServer(app);  

var api = require('./routes/api'); 
var mongoose = require('mongoose');


var mongoURI = "mongodb://127.0.0.1:27017/calc";
var MongoDB = mongoose.connect(mongoURI).connection;
	MongoDB.on('error', function(err) { console.log(err.message); });
	MongoDB.once('open', function() {
   console.log("mongodb connection open");
});

// view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//-------------------------ROUTES-----------------------------//
app.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

app.use('/api', api);

//
////io.on('connection', function(socket){
////  console.log('a user connected');
////});
//
//// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  next(err); 
//});
//
//// error handlers
//
//// development error handler
//// will print stacktrace
//if (app.get('env') === 'development') {
//  app.use(function(err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//      message: err.message,
//      error: err
//    });
//  });
//}
//
//// production error handler
//// no stacktraces leaked to user
//app.use(function(err, req, res, next) {
//  res.status(err.status || 500);
//  res.render('error', {
//    message: err.message,
//    error: {}
//  });
//});
//
//
///**
// * Module dependencies.
// */
//
//
//
///**
// * Get port from environment and store in Express.
// */
//
//var port = normalizePort(process.env.PORT || '3000');
//app.set('port', port);
//
///**
// * Create HTTP server.
// */
//
//
//
///**
// * Listen on provided port, on all network interfaces.
// */
//
server.listen(5000);
server.on('error', onError);
server.on('listening', onListening);
//io.listen(server);
//
//
//var listener = io.listen(server);
//listener.sockets.on('connection', function(socket){
//    socket.emit('message', {'message': 'hello world'});
//});
///**
// * Normalize a port into a number, string, or false.
// */
//
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
//
///**
// * Event listener for HTTP server "error" event.
// */
//
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
