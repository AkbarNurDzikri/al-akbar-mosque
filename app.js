const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
mongoose.connect('mongodb://127.0.0.1:27017/db_alakbar');


// define routes
const indexRouter = require('./routes/index');
const rolesRouter = require('./routes/roles');
const usersRouter = require('./routes/users');
const anggotaRouter = require('./routes/anggota');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// method override
app.use(methodOverride('_method'));
// use session
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  })
);
// use flash
app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/anggota', anggotaRouter);
app.use('/roles', rolesRouter);

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
