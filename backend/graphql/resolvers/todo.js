const { TODO_STATUSES } = require("../constants/index");

const getTodos = async (_, { status }, { Todo, Task, Action, Contact }) => {
        let queryArgs;
        if (!TODO_STATUSES[status]) {
          queryArgs = {
            order: [["id", "DESC"]]
          };
        } else {
          queryArgs = {
            where: { status },
            order: [["id", "DESC"]]
          };
        }

        return await Todo.findAll(queryArgs);
};

const getTasksByTodoId = async ({id}, _, {Task}) => {
    return await Task.findAll({ where: {TodoId: id}}) || [];
};

const createTodo = async (_, { todo }, { Todo }) => {
    try {
        await Todo.create({ ...todo, status: TODO_STATUSES.TROUBLESHOOTING });
    } catch (e) {
        console.log(e);
    }
};

const updateTodo = async (_, { todo }, { Todo }) => {
    const { id, status } = todo;
    try {
        const foundTodo = await Todo.findOne({ where: { id } });
        const updatedTodo = await foundTodo.update({ status });
        return updatedTodo;
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    tasks: getTasksByTodoId,
    Query: {
        getTodos
    },
    Mutation: {
        createTodo,
        updateTodo
    }
};