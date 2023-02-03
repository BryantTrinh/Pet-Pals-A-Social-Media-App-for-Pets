const { gql } = require("apollo-server-express");

const typeDefs = gql`
	scalar Date
	scalar Upload

	type File {
		filename: String!
		mimetype: String!
		encoding: String!
	}
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
		owner: ID
	}

	type Matches {
		_id: ID
		pet1: String
		pet2: String
	}

	type Auth {
		token: ID!
		user: User
	}

	type Query {
		user: User
		pets: [Pet]
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
			owner: ID!
		): Pet
		addMatch(pet1: String!, pet2: String!): Matches
		singleUpload(file: Upload!): File!
		multipleUpload(files: [Upload!]!): [File!]!
	}
`;
// Not sure if singleUpload/multipleUpload goes into Pet or addPet

module.exports = typeDefs;
