'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('notification', [
      {
        title: 'hello',
        text: 'tere tere',

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'ciao',
        text: 'sellasta',

        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('notifications', null, {});
  },
};
