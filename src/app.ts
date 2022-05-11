import express from 'express';
import morgan from 'morgan';
import { sequelize } from '.';
import { QueryTypes, Model } from 'sequelize';
import Notification from '../database/models/notification';
import { INotification } from './interfaces/notification';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/ping', (_, res) => {
  res.send('pong');
});

//eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/api/notifications', async (_, res) => {
  try {
    const notifications = await sequelize.query('SELECT * FROM notifications', {
      type: QueryTypes.SELECT,
    });

    console.log(notifications);

    res.json(notifications);
  } catch (err: unknown) {
    console.log(err);
  }
});

export default app;
