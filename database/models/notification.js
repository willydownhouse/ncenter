'use strict';

module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    'Notification',
    {
      title: DataTypes.STRING,
      text: DataTypes.STRING,
      createdAt: DataTypes.DATE,
    },
    {
      sequelize,
      underscored: true,
      timestamps: false,
      modelName: 'notification',
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
