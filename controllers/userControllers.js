const models = require('../models/userModels.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    createUser: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            // First hash the password
            const hashed_pwd = await bcrypt.hash(password, saltRounds);
            const userData = { username, email, hashed_pwd };
            await models.createUser(userData);
            res.sendStatus(201);
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
}
