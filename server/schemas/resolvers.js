const { AuthenticationError } = require("apollo-server-express");
const { User, Pet, Matches } = require("../models");
const { signToken } = require("../utils/auth.js");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    pets: async (parent, args, context) => {
      if (context.user.pets) {
        return Pet.find();
      }
    },
    pet: async (parent, { _id }) => {
      return await Pet.findById(_id).populate();
    },
  },
  Mutation: {
    register: async (parent, { name, email, password, location }) => {
      const user = await User.create({ name, email, password, location });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },
    addPet: async (parent, { name, species, birthday, pictures }) => {
      const pet = await Pet.create({ name, species, birthday, pictures });
      return { pet };
    },
    addMatch: async (parent, { pet1, pet2 }) => {
      const match = await Matches.create({ pet1, pet2 });
      return { match };
    },
  },
};

module.exports = resolvers;
