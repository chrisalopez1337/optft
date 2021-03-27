// Mailer setup
const { SendGridApiKey } = require('../config');
const sgMail = require('@sendgrid/mail')
// DB Model
const { Users } = require('../database');

// Mailing Handler
const sendEmail = async (to, subject, html) => {
    try {
        sgMail.setApiKey(SendGridApiKey);
        const message = {
            to,
            from: 'sakura.lopez.dev@gmail.com',
            subject,
            html,
        }
        await sgMail.send(message);
        return true;
    } catch(err) {
        throw new Error(err);
    }
}

// Utility functions
const generateHash = (length = 100) => {
    let result = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const isEmail = (str) => {
  const checkOne = str.indexOf('@') > -1;
  if (checkOne) {
      checkTwo = str.split('@')[1].indexOf('.') > -1;
      return checkTwo;
  } else {
    return false;
  }
}

// Database models

// This function is somewhat redundant as it exists in userModels, may refactor formatting later
const getUser = async (searchItem) => {
    try {
        const query = isEmail(searchItem)
            ? { email: searchItem.toLowerCase() }
            : { username: searchItem.toLowerCase() };

        let user = await Users.find(query);
        if (user[0]) {
            return user[0];
        } else {
            return false;
        }
    } catch(err) {
        throw new Error(err);
    }
}

// PasswordHash handler
const updatePasswordHash = async (searchItem, oldTokens) => {
    try {
        const hash = generateHash();
        const query = isEmail(searchItem)
            ? { email: searchItem.toLowerCase() }
            : { username: searchItem.toLowerCase() };
        const update = { recovery: {...oldTokens, ['passwordHash']: hash }};
        const doc = await Users.findOneAndUpdate(query, update);
        return hash;
    } catch(err) {
        throw new Error(err);
    }
}

// Server side functions
module.exports = {
    handlePasswordReset: async (req, res) => {
        try {
            const { searchItem } = req.body;
            // Make sure the user exists
            const user = await getUser(searchItem);
            if (!user) {
                // Account does not exist
                return { updated: false, message: 'User does not exist' };
            }
            // Update password in DB and retrieve the hash
            const hash = await updatePasswordHash(searchItem, user.recovery);
            // Format email
            const email = user.email;
            

        } catch(err) {

        }
    }
}
