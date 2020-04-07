const Sequelize = require("sequelize");
const db = require("../db");
const Character = require("../character/model");
const Party = require("../party/model");

const Chest = db.define("chest", {
  pp: Sequelize.INTEGER,
  gp: Sequelize.INTEGER,
  ep: Sequelize.INTEGER,
  sp: Sequelize.INTEGER,
  cp: Sequelize.INTEGER,
  type: Sequelize.STRING,
});

Character.belongsTo(Chest);
Party.belongsTo(Chest);
Chest.hasOne(Character);
Chest.hasOne(Party);

module.exports = Chest;
