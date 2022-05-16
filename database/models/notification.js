'use strict';

module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    'Notification',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
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
    Notification.belongsToMany(models.User, {
      through: 'user_notifications',
    });
  };

  return Notification;
};
