const { Schema, model } = require("mongoose");
const User = require("./User.js");

const chatSchema = new Schema({
  user1: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  user2: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: true,
  },
});

const Chat = model("Chat", chatSchema);

module.exports = Chat;
