const supertest = require('supertest');
const app = require('../../src/app');
const { User, Notification, sequelize } = require('../../database/models');

const api = supertest(app);

describe('SIGN IN', () => {
  test('fail without email', async () => {
    const res = await api.post('/api/signin').send({
      password: 'test1234',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Please give your email and password');
  });
  test('fail without password', async () => {
    const res = await api.post('/api/signin').send({
      email: 'email@test.fi',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Please give your email and password');
  });
  test('fails with wrong credentials', async () => {
    const res = await api.post('/api/signin').send({
      email: 'willy@test.com',
      password: 'test123',
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Wrong email or password');
  });
  test('OK with right credentials', async () => {
    const res = await api.post('/api/signin').send({
      email: 'willy@test.com',
      password: 'test1234',
    });

    console.log(res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
