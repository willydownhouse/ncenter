const supertest = require('supertest');
const app = require('../../src/app');
const { User, Notification, sequelize } = require('../../database/models');

const api = supertest(app);

describe('PROTECT MIDDLEWARE', () => {
  test('response 401 without headers/token', async () => {
    const res = await api.get('/api/notifications');

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Please sign in to get access');
  });
  test('response 400 with malformed token', async () => {
    const res = await api
      .get('/api/notifications')
      .set('Authorization', 'Bearer dsafdfadf');

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('jwt malformed');
  });
});

afterAll(async () => {
  await sequelize.close();
});
