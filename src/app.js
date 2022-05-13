const express = require('express');
const morgan = require('morgan');
const { user, notification, sequelize } = require('../database/models/');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/ping', (_, res) => {
  res.send('pong');
});

app.get('/api/notifications', async (_, res) => {
  try {
    const data = await notification.findAll();

    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
