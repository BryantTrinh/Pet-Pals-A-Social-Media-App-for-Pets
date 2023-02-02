const { gql } = require("apollo-server-express");

// scalar upload used to represent the uploaded file(s)
// type file, defining object type schema called 'File', all 3 fields required.
// type Query is the only one query where we define 'uploads', which returns an array of 'File' objects. '[File]' syntax means that the array must contain at least one 'File' object and that each 'File' object is required.
// type Mutation allows for singleUpload and multipleUploads
// The singleUpload(file: Upload!) mutation takes a single Upload argument and returns a single File object.
// The multipleUpload(files: [Upload!]!) mutation takes an array of Upload objects and returns an array of File objects. The [Upload!]! syntax means that the array must contain at least one Upload object and that each Upload object is required.

const typeDefs = gql`
	scalar Date
	scalar Upload

	type User {
		_id: ID
		first_name: String
		last_name: String
		email: String
		password: String
		location: String
	}

	type Pet {
		_id: ID
		name: String
		species: String
		birthday: Date
		pictures: String
	}

	type Matches {
		_id: ID
		pet1: String
		pet2: String
	}

	type File {
		filename: String!
		mimetype: String!
		encoding: String!
	}

	type Auth {
		token: ID!
		user: User
	}

	type Query {
		user: User
		pets: Pet
		pet: Pet
		uploads: [File!]!
	}

	type Mutation {
		register(
			first_name: String!
			last_name: String!
			email: String!
			password: String!
			location: String!
		): Auth
		login(email: String!, password: String!): Auth
		addPet(
			name: String!
			species: String!
			birthday: Date!
			pictures: String!
		): Pet
		addMatch(pet1: String!, pet2: String!): Matches
		singleUpload(file: Upload!): File!
		multipleUpload(files: [Upload!]!): [File!]!
	}
`;

module.exports = typeDefs;
