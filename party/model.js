const Sequelize = require("sequelize");
const db = require("../db");

const Party = db.define("party", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Party;
