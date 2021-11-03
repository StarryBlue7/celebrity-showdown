const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Fame extends Model {}

Fame.init(
  {
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
      },
      name:   {
          type: DataTypes.STRING,
          allowNull: false
      },
      power:  {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'fame',
  }
);

module.exports = Fame;