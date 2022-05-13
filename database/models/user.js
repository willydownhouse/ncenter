'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
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
    // associations can be defined here
    User.belongsToMany(models.notification, {
      through: 'user_notifications',
    });
  };

  return User;
};
