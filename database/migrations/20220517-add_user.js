'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('notifications', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('notifications', 'user_id');
  },
};
