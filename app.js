var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var MongoStore = require('connect-mongo/es5')(session);
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;
var config = require('config');

var routes = require('./routes/account');
var users = require('./routes/users');
var apis = require('./routes/api');
var dashboard = require('./routes/dashboard');
var teams = require('./routes/teams');
var project = require('./routes/project');

// This code loads all the partial templates in a directory and makes them available by filename
var hbs = require('hbs');
var fs = require('fs');
var partialsDir = __dirname + '/views/partials';
var filenames = fs.readdirSync(partialsDir);
filenames.forEach(function (filename) {
    var matches = /^([^.]+).hbs$/.exec(filename);
    if (!matches) {
        return;
    }
    var name = matches[1];
    var template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
    hbs.registerPartial(name, template);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

var expressSessionStore = new MongoStore({url: 'mongodb://localhost/session'});

app.use(require('express-session')({
    secret: 'hushHushIAmTheSecretKey',
    resave: false,
    saveUninitialized: false,
    store: expressSessionStore,
    cookie: {
        domain: 'localhost',
        maxAge: 1000 * 24 * 60 * 100
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session

app.use('/', routes);
app.use('/users', users);
app.use('/api', apis);
app.use('/dashboard', dashboard);
app.use('/teams', teams);
app.use('/projects', project);

// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose connect to mongodb
mongoose.connect(config.get('mongodb.url'));

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
