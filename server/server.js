require("dotenv").config();
const http = require("http");
const io = require("socket.io");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { join } = require("path");
const { authMiddleware } = require("./utils/auth.js");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config");

const PORT = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);
const socket = io(server);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(join(__dirname, "..", "client", "build")));
}

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "client", "build", "index.html"));
});

socket.on("connection", (socket) => {
  console.log("Client is connected");

  socket.on("sendMessage", (message) => {
    socket.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const startApolloServer = async (typeDefs, resolvers) => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  db.once("open", () => {
    server.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`
      );
    });
  });
};

startApolloServer(typeDefs, resolvers);
