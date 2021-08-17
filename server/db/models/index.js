const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const MessageRecipient = require("./messageRecipient");

// associations

User.belongsToMany(Conversation, { through: 'user_conversation' });
Conversation.belongsToMany(User, { through: 'user_conversation' });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);
MessageRecipient.belongsTo(User);
MessageRecipient.belongsTo(Message);
MessageRecipient.belongsTo(Conversation);

module.exports = {
  User,
  Conversation,
  Message,
  MessageRecipient
};
