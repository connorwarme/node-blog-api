const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const cors = require('cors')
require('dotenv').config()
require('./passport')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/user')
const apiRouter = require('./routes/api')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: "lightning", resave: false, saveUninitialized: true }))
app.use(cors())

mongoose.connect(process.env.DB_STRING, {useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"))

app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({ extended: false }))

app.use(function(req, res, next) {
  res.locals.currentUser = req.user
  next()
})

app.use('/', indexRouter)
app.use('/user', usersRouter)
app.use('/api', apiRouter)

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
