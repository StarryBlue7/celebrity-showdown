const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Celebrity extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Celebrity.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false, 
            unique: true
        },
        // power: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,  
        //     references: {
        //         model: 'fame',
        //         key: 'id',
        //     }         
        // },
        XP: {
            type: DataTypes.INTEGER,
            allowNull: false,           
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        fame_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'fame',
                key: 'id'
            }     
    },
  
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'celebrity',
  }
);

module.exports = Celebrity;