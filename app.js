var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
var async = require("async");
const bodyParser = require('body-parser');
var engine = require('ejs-locals');

var port = process.env.PORT || 3000;
const { mongoose } = require('./config/db');
require('./models/User')
require('./models/Video')

var indexRouter = require('./routes/index');

var userApiRouter = require('./api/routes/user')
var videoApiRouter = require('./api/routes/video')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(session({
  secret: 'mysecret',
  resave : true,
  saveUninitialized : true,
  cookie : { maxAge: 7 * 24 * 3600 * 1000, secure: false}
}));
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/api/user', userApiRouter);
app.use('/api/video', videoApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
app.listen(port, function(){
  console.log("App listening on port: " + port);
});