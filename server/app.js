//[]{}
require("dotenv").config();
const express = require("express");
const app = express();

const { ApolloServer } = require("apollo-server-express");

const mongoose = require("mongoose");

//Load schema and resolver
const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");

//Load data methods
const mongoDataMethods = require("./data/db");

//Connect to mongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@tutorial-graphql.gtayjvp.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("mongoseDB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connectDB();

let server = null;
async function startServer() {
  server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      mongoDataMethods,
    }),
  });
  await server.start();
  server.applyMiddleware({ app });
}

startServer();

app.listen({ port: 4000 }, () => {
  console.log(`Server is ready at http://localhost:4000${server.graphqlPath}`);
});
