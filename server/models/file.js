// mongoose model representing the 'File' type defined in our graphql/index.js
const {Schema, model } = require("mongoose");

// const Schema = mongoose.Schema;

const fileSchema = new Schema({
	filename: {
		type: String,
		required: true,
	},
	encoding: {
		type: String,
		required: true,
	},
	mimetype: {
		type: String,
		required: true,
	},
});

const File = model("File", fileSchema);

module.exports = File;
