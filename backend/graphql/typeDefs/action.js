const { gql } = require("apollo-server-express");

const Action = gql`
    type Action {
        id: ID!
        title: String!
        description: String
        complete: Boolean
        contact: Contact!
        TaskId: ID!
        createdAt: String
    }

    input CreateActionInput {
        TaskId: ID!
        title: String!
        description: String
        contact: CreateContactInput
    }

    input UpdateActionInput {
        id: ID!
        complete: Boolean
    }

    extend type Mutation {
        createAction(action: CreateActionInput!): Action
        updateAction(action: UpdateActionInput!): Action
    }

    extend type Query {
        getActions(taskId: ID!): [Action]
    }
`;

module.exports = [Action];