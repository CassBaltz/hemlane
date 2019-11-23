const Todo = require("./todo");
const Task = require("./task");
const Action = require("./action");
const Contact = require("./contact");
const { gql } = require("apollo-server-express");

const Root = [
    gql`
        type Query {_empty: String}
        type Mutation {_empty: String}
    `
];

module.exports = [...Root, ...Todo, ...Task, ...Action, ...Contact];