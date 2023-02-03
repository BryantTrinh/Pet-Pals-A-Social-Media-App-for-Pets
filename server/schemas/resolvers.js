const { AuthenticationError } = require("apollo-server-express");
const { User, Pet, Matches, File } = require("../models");
const { signToken } = require("../utils/auth.js");
const { GraphQLScalarType } = require("graphql");
const graphQLUpload = require("graphql-upload");
const fs = require("fs");
const UPLOAD_DIRECTORY_URL = require("../../server/config");
const storeUpload = require("../utils/helpers/storeUpload");

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
    pets: async (parent, args, context) => {
      if (context.user) {
        return Pet.find({ owner: { $ne: context.user._id } }).populate(
          "owner",
          "_id"
        );
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

  module.exports = {
		Upload: graphQLUpload, //Resolves the `Upload` scalar
		Query: {
			// Retrieves files in our local filesystem
			uploads: async () => {
				return (await fs.promises.readdir(UPLOAD_DIRECTORY_URL)).map(
					(filename) => {
						return {
							filename,
							mimetype: "",
							encoding: "",
						};
					}
				);
			},
		},
		Mutation: {
			// Store a single file
			singleUpload: async (parent, args) => {
				return storeUpload(args.file);
			},
			// Store multiple files
			multipleUpload: async (parent, { files }) => {
				if (!files) files = []; // Turn files into an empty list if it's undefined or null
				// Ensure an error storing one upload doesn’t prevent storing the rest.
				const results = await Promise.allSettled(files.map(storeUpload));
				return results.reduce((storedFiles, { value, reason }) => {
					if (value) storedFiles.push(value);
					else console.error(`Failed to store upload: ${reason}`);
					return storedFiles;
				}, []);
			},
		},
	};



  module.exports = resolvers;
  