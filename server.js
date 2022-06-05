const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const resolvers = require("./resolver");
const typeDefs = require("./typeDefs");
const mongoose = require("mongoose");

async function startServer() {
  const app = express();
  const apolloserver = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloserver.start();

  apolloserver.applyMiddleware({ app: app });

  app.use((req, res) => {
    res.send("hello from express");
  });

  await mongoose.connect('mongodb://localhost:27017/post_db',{ useNewUrlParser: true })
  console.log('MongoDb connected');
  app.listen(4000, () => console.log("Server is running on port 4000"));
}
startServer();
