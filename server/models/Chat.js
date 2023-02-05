const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const chatSchema = new Schema({
  roomID: {
    type: String,
    required: true,
  },
  messages: [messageSchema],
});

const Chat = model("Chat", chatSchema);

module.exports = Chat;
