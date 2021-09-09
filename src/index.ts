import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from 'cors'
import { buildSchema } from "type-graphql";
import { HelloWorld } from "./resolvers/HelloWorld.resolver";
import { MovieResolver } from "./resolvers/Movie.resolver";

(async () => {
  const app = express();
  app.use(cors())

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloWorld, MovieResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(5000, () => {
    console.log("express server started");
  });
})();

