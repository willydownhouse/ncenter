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
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      notificationId: {
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
  // Notification.associate = function (models) {
  //   // associations can be defined here
  //   Notification.belongsToMany(models.User, {
  //     through: 'user_notifications',
  //   });
  // };

  return UserNotification;
};
