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
    as: "attacker",
    foreignKey: "attacker_id",
  });

Celebrity.hasMany(Showdown, {
    as: "attacks",
    foreignKey: "attacker_id",
  });

Showdown.belongsTo(Celebrity, {
    as: "defender",
    foreignKey: "defender_id",
  });

Celebrity.hasMany(Showdown, {
    as: "defends",
    foreignKey: "defender_id",
  });