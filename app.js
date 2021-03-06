var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('client-sessions');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var connection = require('express-myconnection');

var routes = require('./routes/index');
var users = require('./routes/users');
var chat = require('./routes/chat');
//var calculate = require('./routes/calculate');

var app = express();
var io = require('socket.io').listen(app.listen(3001));

io.sockets.on('connection',function(socket){
    socket.emit('message',{message:'welcome to chat'});
    socket.on('send',function(data){
        io.sockets.emit('message',data);
    });
});

//set mysql connection
app.use(connection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog'
}, 'single'));

//session configurations
app.use(session({
  cookieName: 'session',
  secret: 'test123',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes for the applicaion
app.use('/', routes);
app.use('/users', users);
app.use('/chat',chat);
//app.use('/calculate', calculate);
//app.route('/searching').get( function(req, res){
// res.send("WHEEE");
//});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

app.listen(3000);




