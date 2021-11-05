const Celebrity = require("./Celebrity");
const User = require("./User");
const Showdown = require("./Showdown");
const Fame = require("./Fame");

User.hasMany(Celebrity, {
    foreignKey: "user_id",
});

Celebrity.belongsTo(User, {
    foreignKey: "user_id",
});

Celebrity.belongsTo(Fame, {
    foreignKey: "fame_id",
});

Fame.hasMany(Celebrity, {
    foreignKey: "fame_id",
});

Showdown.belongsTo(Celebrity, {
    foreignKey: "attacker_id",
    onDelete: 'CASCADE'
});

Celebrity.hasMany(Showdown, {
    foreignKey: "attacker_id",
    onDelete: 'CASCADE'
});

module.exports = {
  User,
  Celebrity,
  Showdown,
  Fame
};
