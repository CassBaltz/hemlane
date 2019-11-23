const getTasks = async (_, { TodoId }, { Task, Action, Contact }) => {
    return await Task.findAll({where: { TodoId }});
};

const getActionsByTaskId = async ({id}, _, { Action }) => {
    return await Action.findAll({where: {TaskId: id}}) || [];
};

const createTask = async (_, { task }, { Task }) => {
    const { title, description, TodoId } = task;
    try {
        return await Task.create({ title, description, TodoId, complete: false });
    } catch (e) {
        console.log(e);
    }
};

const updateTask = async (_, { task }, { Task }) => {
    const { id, complete } = task;
    try {
        const foundTask = await Task.findOne({ where: { id } });
        const updatedTask = await foundTask.update({ complete });
        return updatedTask;
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    Mutation: {
        createTask,
        updateTask
    },
    Query: {
        getTasks
    },
    actions: getActionsByTaskId
};