const { Schema, model } = require("mongoose");

const matchesSchema = new Schema({
  pet1: {
    type: String,
    required: true,
  },
  pet2: {
    type: String,
    required: true,
  },
});

const Matches = model("Matches", matchesSchema);

module.exports = Matches;
