const Todo = require("./todo");
const Task = require("./task");
const Action = require("./action");
const Contact = require("./contact");

module.exports = {
    Mutation: {
        ...Todo.Mutation,
        ...Task.Mutation,
        ...Action.Mutation,
        ...Contact.Mutation
    },
    Query: {
        ...Todo.Query,
        ...Task.Query,
        ...Action.Query,
        ...Contact.Query
    },
    Todo: {
        tasks: Todo.tasks
    },
    Task: {
        actions: Task.actions
    },
    Action: {
        contact: Action.contact
    }
};