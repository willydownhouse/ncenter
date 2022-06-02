'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('notifications', [
      {
        title: 'Notiifcation 1',
        text: 'tere tere',
        user_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Notiifcation 2',
        text: 'sellasta',
        user_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Notiifcation 3',
        text: 'sellasta',
        user_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('notifications', null, {});
  },
};
