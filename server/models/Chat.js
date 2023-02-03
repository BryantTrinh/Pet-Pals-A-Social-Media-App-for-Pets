const { Schema, model } = require("mongoose");
const User = require("./User.js");

const messageSchema = new Schema(
  {
    sender: {
      type: String,
      required: true,
      trim: true,
    },
    receiver: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true
  }
);

const chatSchema = new Schema({
  roomID: {
    type: String,
    required: true
  },
  messages: [messageSchema]
})

const Chat = model("Chat", chatSchema);

module.exports = Chat;
