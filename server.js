import { ApolloServer } from "apollo-server-express"
import express from "express"
import mongoose from "mongoose"
import resolvers from "./resolver"
import typeDefs from "./typeDefs"

async function startServer() {
  const app = express();
  const apolloserver = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloserver.start();
  apolloserver.applyMiddleware({ app: app });

  app.use((_, res) => {
    res.send("hello from express");
  });

  await mongoose.connect('mongodb://localhost:27017/post_db',{ useNewUrlParser: true })
  console.log('MongoDb connected');
  app.listen(4000, () => console.log("Server is running on port 4000"));
}

startServer();
