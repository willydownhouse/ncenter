'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('user_notifications', [
      {
        user_id: 1,
        notification_id: 1,
      },
      {
        user_id: 2,
        notification_id: 2,
        read: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('user_notifications', null, {});
  },
};
