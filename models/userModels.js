const { Users } = require('../database');

module.exports = {
    createUser: async (userData) => {
        try {
            await Users.create(userData);
            return 'OK'
        } catch(err) {
            throw new Error(err);
        }
    },

    getUser: async (query) => {
        try {
            const data = await Users.find(query);
            return data[0];
        } catch(err) {
            throw new Error(err);
        }
    }
}
