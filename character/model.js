const Sequelize = require("sequelize");
const db = require("../db");
const User = require("../user/model");
const Party = require("../party/model");

const Character = db.define("character", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Character.belongsTo(User);
Character.belongsTo(Party);
User.hasMany(Character);
Party.hasMany(Character);

module.exports = Character;
