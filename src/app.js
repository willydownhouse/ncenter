const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const passport = require('passport');
const googleStrategy = require('./utils/GoogleAuth');
const session = require('express-session');
const notificationRouter = require('./routes/notificationRouter');
const errorController = require('./controllers/errorController');
const authRouter = require('./routes/authRouter');
const AppError = require('./utils/AppError');
const testRouter = require('./routes/testRouter');

const app = express();

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET',
  })
);

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));

passport.use(googleStrategy);

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'test') {
  app.use('/api/test', testRouter);
}

app.get('/ping', (_, res) => {
  res.send('pong');
});

app.use('/api/', authRouter);
app.use('/api/notifications', notificationRouter);

app.all('*', (req, res, next) => {
  next(new AppError('Unknown endpoint', 404));
});

app.use(errorController);

module.exports = app;
