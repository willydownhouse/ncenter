'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.ENUM('client', 'admin'),
    },
    {
      sequelize,
      underscored: true,
      timestamps: true,
      modelName: 'user',
    }
  );
  User.associate = function (models) {
    // associations can be defined her
    User.belongsToMany(models.Notification, {
      through: 'user_notifications',
    });
  };

  return User;
};
