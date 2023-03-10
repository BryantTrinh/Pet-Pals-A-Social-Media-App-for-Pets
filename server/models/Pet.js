const { Schema, model } = require("mongoose");
const User = require("./User.js");

const petSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	species: {
		type: String,
		required: true,
	},
	birthday: {
		type: Date,
		required: true,
	},
	picturesURL: {
		type: String,
		required: true,
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

const Pet = model("Pet", petSchema);

module.exports = Pet;
