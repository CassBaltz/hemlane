const getActions = async (_, { taskId }, { Action }) => {
    try {
        return await Action.findAll({ where: { TaskId: taskId } });
    } catch (e) {
        console.log(e);
    }
};

const getContactByActionId = async ({id}, _, {Contact}) => {
    try {
      return await Contact.findOne({ where: { ActionId: id } });
    } catch (e) {
      console.log(e);
    }
}

const createAction = async (_, { action }, { Action, Contact }, info) => {
    const { title, description, contact, TaskId } = action;
    const {name, email} = contact;
    try {
        const action = await Action.create({ title, description, TaskId, complete: false });
        const contact = await Contact.create({ActionId: action.id, name, email});
        action.contact = contact;
        return action;
    } catch (e) {
        console.log(e);
    }
};

const updateAction = async (_, { action }, { Action }) => {
    const { id, complete } = action;
    try {
        const foundAction = await Action.findOne({ where: { id } });
        const updatedAction = await foundAction.update({ complete });
        return updatedAction;
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    Mutation: {
        createAction,
        updateAction
    },
    Query: {
        getActions
    },
    contact: getContactByActionId
};