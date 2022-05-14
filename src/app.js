const express = require('express');
const morgan = require('morgan');
const { User, Notification } = require('../database/models/');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/ping', (_, res) => {
  res.send('pong');
});

app.get('/api/notifications/:id', async (req, res) => {
  try {
    console.log(req.params);
    const data = await Notification.findByPk(req.params.id);

    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
