const { gql } = require("apollo-server-express");

const Contact = gql`
    type Contact {
        id: ID!
        name: String!
        email: String!
        ActionId: ID!
    }

    input CreateContactInput {
        name: String!
        email: String!
    }

    extend type Mutation {
        createContact(contact: CreateContactInput!): Contact
    }

    extend type Query {
        getContact(actionId: ID!): Contact!
    }
`;

module.exports = [Contact];