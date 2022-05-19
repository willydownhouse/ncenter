const supertest = require('supertest');
const app = require('../src/app');
const { User, Notification, sequelize } = require('../database/models');

const api = supertest(app);

describe('GET NOTIFICATIONS', () => {
  let token;
  beforeEach(async () => {
    const res = await api.post('/api/signin').send({
      email: 'willy@test.com',
      password: 'test1234',
    });

    token = res.body.token;
  });
  test('Access to notifications with after sign in', async () => {
    const res = await api
      .get('/api/notifications')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.docs).toEqual(4);
  });
});
describe('CREATING NOTIFICATIONS ', () => {
  let token;
  beforeEach(async () => {
    const res = await api.post('/api/signin').send({
      email: 'willy@test.com',
      password: 'test1234',
    });

    token = res.body.token;
  });
  test('Role CLIENT cannot create notifications', async () => {
    const res = await api
      .post('/api/notifications')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('You are not allowed to do this action');
  });
});
describe('CREATING NOTIFICATIONS ', () => {
  let token;
  beforeEach(async () => {
    const res = await api.post('/api/signin').send({
      email: 'admin@test.com',
      password: 'test1234',
    });

    token = res.body.token;
  });

  test('Role ADMIN can create notifications', async () => {
    const res = await api
      .post('/api/notifications')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Testi notification',
        text: 'helou',
        users: [2, 3],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.notification.title).toBe('Testi notification');
  });

  test('fails if no title', async () => {
    const res = await api
      .post('/api/notifications')
      .set('Authorization', `Bearer ${token}`)
      .send({
        text: 'Testi notification',
        users: [1],
      });

    console.log('KKKKKKKKKKKKKKKKKKKKK');
    console.log(res.body);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Not a valid notification');
  });
  // test('fails if no text', async () => {
  //   const res = await api
  //     .post('/api/notifications')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send({
  //       title: 'Testi notification',
  //       users: [1],
  //     });

  //   expect(res.statusCode).toBe(400);
  //   expect(res.body.message).toBe('Not a valid notification');
  // });
  // test('fails if no users', async () => {
  //   const res = await api
  //     .post('/api/notifications')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send({
  //       title: 'Testi notification',
  //       text: 'sas',
  //     });

  //   expect(res.statusCode).toBe(400);
  //   expect(res.body.message).toBe('Not a valid notification');
  // });
  // test('fails if users length is 0', async () => {
  //   const res = await api
  //     .post('/api/notifications')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send({
  //       title: 'Testi notification',
  //       text: 'sas',
  //       users: [],
  //     });

  //   expect(res.statusCode).toBe(400);
  //   expect(res.body.message).toBe('Please sent notification at least one user');
  // });
});

afterAll(async () => {
  await sequelize.close();
});
