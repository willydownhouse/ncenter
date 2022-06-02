'use strict';

module.exports = (sequelize, DataTypes) => {
  const OAuth = sequelize.define(
    'OAuth',
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
    },
    {
      sequelize,
      underscored: true,
      timestamps: true,
      modelName: 'oauth',
    }
  );

  return OAuth;
};
