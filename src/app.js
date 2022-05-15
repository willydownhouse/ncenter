const express = require('express');
const morgan = require('morgan');
const notificationRouter = require('./routes/notificationRouter');
const errorController = require('./controllers/errorController');
const AppError = require('./utils/AppError');

const app = express();

app.use(express.json());

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/ping', (_, res) => {
  res.send('pong');
});

app.use('/api/notifications', notificationRouter);

app.all('*', (req, res, next) => {
  next(new AppError('Unknown endpoint', 404));
});

app.use(errorController);

module.exports = app;
