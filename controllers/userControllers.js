const models = require('../models/userModels.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Helper functions
const isEmail = (str) => {
  const checkOne = str.indexOf('@') > -1;
  if (checkOne) {
      checkTwo = str.split('@')[1].indexOf('.') > -1;
      return checkTwo;
  } else {
    return false;
  }
}

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
    },

    getUser: async (req, res) => {
        try {
            const { searchItem } = req.params;
            // Check if its a username or email
            const query = isEmail(searchItem)
                ? { email: searchItem }
                : { username: searchItem };
            // Retrieve data
            const data = await models.getUser(query);
            res.status(201).send(data);
        } catch(err) {
            res.sendStatus(500);
        }
    },
}
