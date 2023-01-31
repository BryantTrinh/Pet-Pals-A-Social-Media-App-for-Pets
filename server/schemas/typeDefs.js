const { gql } = require("apollo-server-express");

const typeDefs = gql`
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

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user: User
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
    ): Auth
    addMatch(pet1: String!, pet2: String!): Auth
  }
`;

module.exports = typeDefs;
