'use strict';

module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    'user_notifications',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      notification_id: {
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
      timestamps: true,
      modelName: 'user_notifications',
    }
  );
  Notification.associate = function (models) {
    // associations can be defined here
    Notification.belongsToMany(models.User, {
      through: 'user_notifications',
    });
  };

  return Notification;
};
