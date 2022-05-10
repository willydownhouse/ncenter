'use strict';
//const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.ENUM('client', 'admin'),
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Notification, {
      foreignKey: 'userId',
      as: 'user_notifications',
      onDelete: 'CASCADE',
    });
  };

  return User;
  // class User extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // }
  // User.init(
  //   {
  //     email: DataTypes.STRING,
  //     password: DataTypes.STRING,
  //     role: DataTypes.ENUM('client', 'admin'),
  //   },
  //   {
  //     sequelize,
  //     modelName: 'User',
  //   }
  // );
};
