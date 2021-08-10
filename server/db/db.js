const Sequelize = require("sequelize");

const db = new Sequelize(process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5433/messenger", {
  logging: false
});

module.exports = db;
