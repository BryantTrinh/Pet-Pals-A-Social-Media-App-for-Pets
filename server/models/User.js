const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const Pet = require("./Pet.js");
const Chat = require("./Chat.js");

const userSchema = new Schema({
	first_name: {
		type: String,
		required: true,
		trim: true,
	},
	last_name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: [/.+@.+\..+/, "Must match an email address!"],
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
	},
	location: {
		type: String,
		required: true,
	},
	pets: [Pet.schema],
	chats: [Chat.schema],
	friends: [
		{
			_id: { type: Schema.Types.ObjectId, ref: "User" },
			first_name: { type: String },
			last_name: { type: String },
		},
	],
});

userSchema.pre("save", async function (next) {
	if (this.isNew || this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 10);
	}

	next();
});

userSchema.methods.isCorrectPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
