const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Celebrity extends Model {}

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
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,  
            defaultValue: 1      
        },
        XP: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            defaultValue: 0          
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
    },
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'celebrity',
    }
);

module.exports = Celebrity;