const { AuthenticationError } = require("apollo-server-express");
const { User, Pet, Matches } = require("../models");
const { signToken } = require("../utils/auth.js");
const { GraphQLScalarType } = require("graphql");
const dayjs =

const dateResolver = new GraphQLScalarType({
  name: "Date",
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return dayjs(value).format("YYYY-MM-DD");
  },
});

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    pets: async (parent, args, context) => {
      if (context.user) {
        return Pet.find({});
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    pet: async (parent, { _id }) => {
      if (context.user) {
        if (context.user.pets) {
          const pet = await Pet.findById(_id).populate();
          if (!pet) {
            return "No pet found with this id.";
          }
          return;
        }
        throw new AuthenticationError("No pets for this user.");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Mutation: {
    register: async (
      parent,
      { first_name, last_name, email, password, location }
    ) => {
      const user = await User.create({
        first_name,
        last_name,
        email,
        password,
        location,
      });
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
    addPet: async (parent, { name, species, birthday, pictures }, context) => {
      if (context.user) {
        const pet = await Pet.create({ name, species, birthday, pictures });
        const updatedUserPets = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { pets: pet } },
          { new: true }
        );
        return pet;
      }
      throw new AuthenticationError("Please login to add a pet.");
    },
    addMatch: async (parent, { pet1, pet2 }) => {
      if (context.user) {
        const match = await Matches.create({ pet1, pet2 });
        return { match };
      }
      throw new AuthenticationError("Please login to create a match.");
    },
  },
  Date: dateResolver,
};

module.exports = resolvers;
