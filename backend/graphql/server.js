const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./typeDefs/index");
const resolvers = require("./resolvers/index");

const db = require("../db/models/index");

const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: () => db
});

module.exports = server;