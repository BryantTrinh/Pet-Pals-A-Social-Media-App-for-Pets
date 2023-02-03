const { AuthenticationError } = require("apollo-server-express");
const { User, Pet, Chat } = require("../models");
const { signToken } = require("../utils/auth.js");
const { GraphQLScalarType } = require("graphql");

const dateResolver = new GraphQLScalarType({
  name: "Date",
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.toJSON();
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
    owner: async (parent, { ownerId }, context) => {
      return User.findOne({ _id: ownerId });
    },
    pets: async (parent, args, context) => {
      if (context.user) {
        return Pet.find({ owner: { $ne: context.user._id } });
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
    getChat: async (parent, { roomID }, context) => {
      if (context.user) {
        return await Chat.findOne({ roomID });
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
        const pet = await Pet.create({
          name,
          species,
          birthday,
          pictures,
          owner: context.user._id,
        });
        const updatedUserPets = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { pets: pet } },
          { new: true }
        );
        return pet;
      }
      throw new AuthenticationError("Please login to add a pet.");
    },
    // addMatch: async (parent, { pet1, pet2 }) => {
    //   if (context.user) {
    //     const match = await Matches.create({ pet1, pet2 });
    //     return { match };
    //   }
    //   throw new AuthenticationError("Please login to create a match.");
    // },
    createChat: async (parent, { roomID }, context) => {
      if (context.user) {
        const existingChat = await Chat.findOne({ roomID });

        if (existingChat) {
          throw new AuthenticationError("Chat with this roomID already exists!")
        }

        const chatId = await Chat.create({ roomID });
        const usersId = chatId.roomID.split(',')

        console.log(chatId);
        console.log(usersId); 

        usersId.map(item => console.log(item))

        usersId.map(async (userId) => {
          const updateUserChats = await User.findByIdAndUpdate(
            userId,
            { $push: { chats: { roomID } } },
            { new: true }
          )
        })

        return chatId
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addMessage: async (parent, { roomID, message }, context) => {
      if (context.user) {
        return await Chat.findOneAndUpdate(
          { roomID },
          { $push: { messages: message } },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Date: dateResolver,
};

module.exports = resolvers;
