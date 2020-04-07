const Sequelize = require("sequelize");
const db = require("../db");

const Transaction = db.define("transaction", {
  type: Sequelize.STRING,
  pp: Sequelize.INTEGER,
  gp: Sequelize.INTEGER,
  ep: Sequelize.INTEGER,
  sp: Sequelize.INTEGER,
  cp: Sequelize.INTEGER,
  description: Sequelize.TEXT,
  fromChestId: Sequelize.INTEGER,
  toChestId: Sequelize.INTEGER,
});

module.exports = Transaction;
