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

describe('SUCCESS WITH TOKEN', () => {
  let token;
  beforeEach(async () => {
    const res = await api.post('/api/signin').send({
      email: 'willy@test.com',
      password: 'test1234',
    });

    token = res.body.token;
  });
  test('Access to notifications with valid token', async () => {
    const res = await api
      .get('/api/notifications')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.docs).toEqual(2);
  });
});
describe('RESTRICT TO ADMIN MIDDLEWARE', () => {
  let token;
  beforeEach(async () => {
    const res = await api.post('/api/signin').send({
      email: 'willy@test.com',
      password: 'test1234',
    });

    token = res.body.token;
  });
  test('Role client cannot create notifications', async () => {
    const res = await api
      .post('/api/notifications')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('You are not allowed to do this action');
  });
});

afterAll(async () => {
  await sequelize.close();
});
