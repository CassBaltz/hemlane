const { gql } = require("apollo-server-express");

const Task = gql`
    type Task {
        id: ID!
        title: String!
        description: String
        complete: Boolean
        TodoId: ID!
        createdAt: String
        actions: [Action]
    }

    input CreateTaskInput {
        TodoId: ID!
        title: String!
        description: String
    }

    input UpdateTaskInput {
        id: ID!
        complete: Boolean
    }

    extend type Mutation {
        createTask(task: CreateTaskInput!): Task
        updateTask(task: UpdateTaskInput!): Task
    }

    extend type Query {
        getTasks(todoId: ID!): [Task]
    }
`;

module.exports = [Task];