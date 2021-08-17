const Sequelize = require("sequelize");
const db = require("../db");

const MessageRecipient = db.define("message_recipient", {
  isRead: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
});

module.exports = MessageRecipient;