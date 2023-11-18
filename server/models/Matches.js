const { Schema, model } = require("mongoose");
const Pet = require("./Pet.js");

const matchesSchema = new Schema({
	pet1: Pet.schema,
	pet2: Pet.schema,
});

const Matches = model("Matches", matchesSchema);

module.exports = Matches;