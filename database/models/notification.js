'use strict';

module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    'notification',
    {
      title: DataTypes.STRING,
      text: DataTypes.STRING,
    },
    {
      sequelize,
      underscored: true,
      timestamps: true,
      modelName: 'notification',
    }
  );
  Notification.associate = function (models) {
    // associations can be defined here
    Notification.belongsToMany(models.user, {
      through: 'user_notifications',
    });
  };

  return Notification;
};
