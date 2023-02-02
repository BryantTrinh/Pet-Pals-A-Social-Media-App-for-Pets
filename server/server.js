require("dotenv").config();
const makeDir = require("make-dir");
const express = require("express");
const http = require("http");
const io = require("socket.io");
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { graphqlUploadExpress } = require("graphql-upload");
const mongoose = require("mongoose");
const { join } = require("path");
const { authMiddleware } = require("./utils/auth");
// const { typeDefs, resolvers } = require("./schemas");
const UPLOAD_DIRECTORY_URL = require("./config/UPLOAD_DIRECTORY_URL");
const apolloTypeDefs = require("./graphql/typeDefs/index");
const apolloResolvers = require("./graphql/resolvers/index");
const db = require("./config");
const PORT = process.env.PORT || 3001;
const app = express();
const httpServer = http.createServer(app);
// const socket = io(httpServer);

async function startServer() {
	await makeDir(UPLOAD_DIRECTORY_URL);

	const server = new ApolloServer({
		typeDefs: apolloTypeDefs,
		resolvers: apolloResolvers,
		context: authMiddleware,
		plugins: [
			ApolloServerPluginDrainHttpServer({
				httpServer,
			}),
		],
	});

	function startApolloServer(typeDefs, resolvers) {
		const server = new ApolloServer({
			typeDefs: apolloTypeDefs,
			resolvers: apolloResolvers,
			context: authMiddleware,
			plugins: [
				ApolloServerPluginDrainHttpServer({
					httpServer,
				}),
			],
		});

		server.applyMiddleware({
			app,
			path: "/graphql",
			cors: {
				origin: "*",
				methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
				preflightContinue: false,
				optionsSuccessStatus: 204,
			},
		});
	}

	app.use(express.json());
	app.use(
		express.urlencoded({
			extended: false,
		})
	);

	app.use((req, res, next) => {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
		res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
		if (req.method === "OPTIONS") {
			return res.sendStatus(200);
		}
		next();
	});

	await mongoose.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});

	if (process.env.NODE_ENV === "production") {
		app.use(express.static(join(__dirname, "..", "client", "build")));

		app.get("/", (req, res) => {
			res.sendFile(join(__dirname, "..", "client", "build", "index.html"));
		});
	}
	startApolloServer(apolloTypeDefs, apolloResolvers);

	// mongoose.connection.once("open", () => {
	//   app.listen(PORT, () => {
	//     console.log(`Server is listening on port ${PORT}`);
	//     console.log(
	//       `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
	//     );
	//   });
	// });

	db.once("open", () => {
		app.listen(PORT, () => {
			console.log(`API server running on port ${PORT}!`);
			console.log(
				`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
			);
		});
	});
}

// commented this out because I changed the route for the typedefs and the resolvers.
// startApolloServer(typeDefs, resolvers);
// startApolloServer(apolloTypeDefs, apolloResolvers);

// Leaving this commented out, in case we need socket.io
// socket.on("connection", (socket) => {
// console.log("Client is connected");

//   socket.on("sendMessage", (message) => {
//     socket.emit("receiveMessage", message);
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });
