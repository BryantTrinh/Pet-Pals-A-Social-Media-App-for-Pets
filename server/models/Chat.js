const { Schema, model } = require("mongoose");

const chatSchema = new Schema({
  user1: {
    type: String,
    required: true,
    trim: true,
  },
  user2: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const Chat = model("Chat", chatSchema);

module.exports = Chat;
