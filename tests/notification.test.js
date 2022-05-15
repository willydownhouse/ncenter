const supertest = require('supertest');
const app = require('../src/app');
const { User, Notification, sequelize } = require('../database/models');

const api = supertest(app);

describe('Notifications', () => {
  test('test', async () => {
    const res = await api.get('/api/notifications');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(0);
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
