const { Op } = require("sequelize");
const db = require("../db");
const Message = require("./message");

const Conversation = db.define("conversation", {});

// find conversation by id

Conversation.findConversation = async function (convoId) {
  const conversation = await Conversation.findOne({
    where: {
      id: convoId
    }
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

module.exports = Conversation;
