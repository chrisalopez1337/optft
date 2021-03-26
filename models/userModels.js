const { Users } = require('../database');

module.exports = {
    createUser: async (userData) => {
        try {
            await Users.create(userData);
            return 'OK'
        } catch(err) {
            throw new Error(err);
        }
    }
}
