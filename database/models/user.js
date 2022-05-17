'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('client', 'admin'),
        defaultValue: 'client',
      },
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

    User.hasOne(models.Notification);
  };

  return User;
};
