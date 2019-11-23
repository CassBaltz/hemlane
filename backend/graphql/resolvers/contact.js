const getContact = async (_, { actionId }, { Contact }) => {
    try {
        return await Contact.findOne({where: {ActionId: actionId}})
    } catch (e) {
        console.log(e);
    }
};

const createContact = async (_, { contact }, { Contact }) => {
    try {
        const { name, email, actionId } = contact;
        return await Contact.create({name, email, ActionId: actionId});
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    Query: {
        getContact
    },
    Mutation: {
        createContact
    }
};