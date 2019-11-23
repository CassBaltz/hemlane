const { gql } = require("apollo-server-express");
const { TODO_STATUSES } = require("../constants/index");

const Todo = gql`
    enum TodoStatus {
        ${TODO_STATUSES.TROUBLESHOOTING}
        ${TODO_STATUSES.WIP}
        ${TODO_STATUSES.COMPLETE}
    }
    
    type Todo {
        id: ID!
        title: String!
        description: String
        status: TodoStatus!
        createdAt: String
        tasks: [Task]
    }

    input CreateTodoInput {
        title: String!
        description: String
    }

    input UpdateTodoInput {
        id: ID!
        status: String!
    }

    extend type Mutation {
        createTodo(todo: CreateTodoInput!): Todo
        updateTodo(todo: UpdateTodoInput!): Todo
    }

    extend type Query {
        getTodos(status: String): [Todo]
    }
`;

module.exports = [Todo];