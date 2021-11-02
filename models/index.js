const Celebrity = require("./Celebrity");
const User = require("./User");
const Showdown = require("./Showdown");
const Fame = require("./Fame");

User.hasMany(Celebrity, {
    foreignKey: "user_id",
  });

Celebrity.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
  });

