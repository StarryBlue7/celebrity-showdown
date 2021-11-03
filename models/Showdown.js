const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Showdown extends Model {}

Showdown.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        attacker_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "celebrity",
                key: "id",
            },
        },
        defender_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        defender_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        attacker_win: {
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
    modelName: "showdown",
    }
);

module.exports = Showdown;
