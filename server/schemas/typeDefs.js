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
    pets: [Pet]
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

  type Message {
    sender: ID
    receiver: ID
    message: String
    createdAt: String
  }

  type Chat {
    roomID: String
    messages: [Message]
  }

  input MessageInput {
    sender: String
    receiver: String
    message: String
  }

  type Query {
    user: User
    pets: [Pet]
    myPets: [Pet]
    pet: Pet
    owner: User
    getChat(roomID: String): Chat
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
    createChat(roomID: String, messages: [MessageInput]): Chat
    addMessage(roomID: String, message: MessageInput): Chat
  }
`;

module.exports = typeDefs;
