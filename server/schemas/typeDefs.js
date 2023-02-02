const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

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
    owner: User
    pets: [Pet]
    pet: Pet
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
      owner: ID
    ): Pet
    addMatch(pet1: String!, pet2: String!): Matches
  }
`;

module.exports = typeDefs;
