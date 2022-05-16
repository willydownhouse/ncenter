'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('notifications', [
      {
        title: 'hello',
        text: 'tere tere',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'ciao',
        text: 'sellasta',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('notifications', null, {});
  },
};
