'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserNotification = sequelize.define(
    'UserNotification',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      NotificationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'notifications', key: 'id' },
      },
      read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      underscored: true,
      timestamps: false,
      modelName: 'user_notification',
    }
  );

  return UserNotification;
};
