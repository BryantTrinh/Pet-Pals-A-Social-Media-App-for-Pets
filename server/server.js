require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { join, resolve } = require("path");
const { authMiddleware } = require("./utils/auth.js");
const { User, Chat } = require("./models");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config");

const PORT = process.env.PORT || 3001;
const app = express();

// Socket.io setup
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://hidden-headland-00556.herokuapp.com/",
    // origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// Socket server side code
io.on("connection", (socket) => {
  console.log(`Client is connected with ID: ${socket.id}`);

  socket.on("joinRoom", async (data) => {
    socket.join(data);
    
    const chatData = await Chat.findOne({ roomID: data });

    io.to(data).emit("receiveMessage", chatData.messages);
  });

  socket.on("sendMessage", async (data) => {
    const addMessage = await Chat.findOneAndUpdate(
      { roomID: data.room },
      { $push: { messages: { sender: data.myId, message: data.message } } },
      { new: true }
    );

    io.to(data.room).emit("receiveMessage", addMessage.messages);
  });

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnected`);
  });
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(join("client", "build")));
}

app.use(express.static(resolve(__dirname, "../client/build")));

app.get("*", function (request, response) {
  response.sendFile(resolve(__dirname, "../client/build", "index.html"));
});

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "..", "client", "build", "index.html"));
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
