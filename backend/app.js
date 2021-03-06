var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var userRouter = require('./routes/userlogin/user');
var loginRouter = require('./routes/userlogin/login');
var registerRouter = require('./routes/userlogin/register');
var fileRouter = require('./routes/file/router');
var contactRouter = require('./routes/contact');
//var trashcanRouter = require('./routes/trashcan/router');
var folderRouter = require('./routes/folders');
var quickRouter = require('./routes/quick');
var favoritesRouter = require('./routes/favorites');
var shareRouter = require('./routes/share');
var trashcanRouter = require('./routes/trashcan');


var passport = require('passport');
var session = require('express-session');
var config = require('./routes/modules/config');

//port
passport.serializeUser(function(user, done) {
    console.log('serialized');
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    console.log('deserialized');
    done(null, user);
});


var app = express();

// view engine setup
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'dist')]);
// app.set('view engine', 'ejs');
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'mykey',
    saveUninitialized: true,
    resave: true
}));

app.use(express.static('public'));
app.use(express.static('views'));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/RegistUser', registerRouter);
app.use('/api/folder', folderRouter);
app.use('/api/favorites', favoritesRouter);
app.use('/api/share', shareRouter);
app.use('/api/trashcan', trashcanRouter);
//app.use('/users', usersRouter);
app.use('/api/file', fileRouter);
app.use('/api/quick', quickRouter);
app.use('/api/contact', contactRouter);
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
