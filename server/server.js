require("dotenv").config();
const makeDir = require("make-dir");
const express = require("express");
const http = require("http");
const io = require("socket.io");
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { graphqlUploadExpress } = require("graphql-upload");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const { join } = require("path");
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schemas");
const UPLOAD_DIRECTORY_URL = require("./config/UPLOAD_DIRECTORY_URL");
const db = require("./config");
// const Chat = require('./config/Chat')

const PORT = process.env.PORT || 3001;
const app = express();
const httpServer = http.createServer(app);
// const socket = io(httpServer);

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

if (process.env.NODE_ENV === "production") {
	app.use(express.static(join(__dirname, "..", "client", "build")));

	app.get("/", (req, res) => {
		res.sendFile(join(__dirname, "..", "client", "build", "index.html"));
	});
}

	const startApolloServer = async (typeDefs, resolvers) => {
		await makeDir(UPLOAD_DIRECTORY_URL);

		const server = new ApolloServer({
			typeDefs,
			resolvers,
			context: authMiddleware,
			plugins: [
				ApolloServerPluginDrainHttpServer({
					httpServer,
				}),
			],
		});

let messageArr = [];
io.on("connection", (socket) => {
  console.log(`Client is connected with ID: ${socket.id}`);

  socket.on('joinRoom', (data) => {
    socket.join(data);
  })

  socket.on("sendMessage", (message) => {
    messageArr.push({ message: message.message })
    
    io.to(message.room).emit("receiveMessage", messageArr);
  });

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnected`);
  });
});

    db.once("open", () => {
		app.listen(PORT, () => {
			console.log(`API server running on port ${PORT}!`);
			console.log(
				`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
			);
		});
	});
  };

  startApolloServer(typeDefs, resolvers);