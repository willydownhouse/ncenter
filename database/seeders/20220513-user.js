'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hash = await bcrypt.hash('test1234', 10);

    return await queryInterface.bulkInsert('users', [
      {
        email: 'willy@test.com',
        password: hash,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'admin@test.com',
        password: hash,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('users', null, {});
  },
};
