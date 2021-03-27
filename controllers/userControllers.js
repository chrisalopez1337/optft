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
            const userData = { username: username.toLowerCase(), email: email.toLowerCase(), hashed_pwd };
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
            console.log(err);
            res.sendStatus(500);
        }
    },

    validateUser: async (req, res) => {
        try {
            const { username, password } = req.body;
            // First fetch the users info
            const userData = await models.getUser({ username });
            // This is kind of a messy way to exit early, may refactor front end to first make sure the account even exists.
            if (!userData?.hashed_pwd) {
                res.status(200).send({ valid: false });
            }
            // Check if hash matches the inputted password
            const result = await bcrypt.compare(password, userData.hashed_pwd);
            let response;
            if (result) {
                response = { valid: true, userData };
            } else {
                response = { valid: false };
            }
            res.status(200).send(response);
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
}
