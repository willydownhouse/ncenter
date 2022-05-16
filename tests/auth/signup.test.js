const supertest = require('supertest');
const app = require('../../src/app');
const { User, Notification, sequelize } = require('../../database/models');

const api = supertest(app);

describe('SIGN UP', () => {
  test('fail without email', async () => {
    const res = await api.post('/api/signup').send({
      password: 'test1234',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Please give your email and password');
  });
  test('fail without password', async () => {
    const res = await api.post('/api/signup').send({
      email: 'email@test.fi',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Please give your email and password');
  });
  test('fail if email already exists', async () => {
    const res = await api.post('/api/signup').send({
      email: 'willy@.test.com',
      password: 'test1234',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      'Validation error: Validation isEmail on email failed'
    );
  });
});
