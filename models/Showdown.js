const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Showdown extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Showdown.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        celebrityA_id:  {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'celebrity',
                key: 'id'
            }
        },
        celebrityB_id:  {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'celebrity',
                key: 'id'
            }
        },
        winner_is_A: { 
            type: DataTypes.BOOLEAN,
            allowNull: false, 
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
          },
    },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'showdown',
  }
);

module.exports = Showdown;
