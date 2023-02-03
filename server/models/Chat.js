const { Schema, model, ObjectId } = require("mongoose");

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
    timestamps: true,
  }
);

const chatSchema = new Schema(
  {
    roomID: {
      ObjectId,
      type: String,
      required: true,
    },
    messages: [messageSchema]
  },
)

const Chat = model("Chat", chatSchema);

module.exports = Chat;
