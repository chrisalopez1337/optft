// Mailer setup
const { SendGridApiKey } = require('../config');
const sgMail = require('@sendgrid/mail')
// DB Model
const { Users } = require('../database');
// Hashing
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
        console.error(err);
    }
}

// Utility functions
const generateHash = (length = 100) => {
    let result = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charLength = chars.length;
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * charLength));
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

// New modular hash handler
const updateHash = async (searchItem, oldTokens, hashToChange) => {
    try {
        const hash = generateHash();
        const query = isEmail(searchItem)
            ? { email: searchItem.toLowerCase() }
            : { username: searchItem.toLowerCase() }
        const update = { recovery: {...oldTokens, [hashToChange]: hash } };
        await Users.findOneAndUpdate(query, update);
        return hash;
    } catch(err) {
        console.error(err);
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
        console.error(err);
    }
}


// These are all currently in one file, I think I can move some of these functions elseware
module.exports = {
    handlePasswordReset: async (req, res) => {
        try {
            const { searchItem } = req.body;
            const badSend = { updated: false, message: 'User does not exist' };
            // Make sure the user exists
            const user = await getUser(searchItem);
            if (!user) {
                // Account does not exist
                res.status(400).send(badSend);
                return;
            }
            // Update password in DB and retrieve the hash
            const hash = await updateHash(searchItem, user.recovery, 'passwordHash');
            // Format email
            const email = user.email;
            const subject = `OPTFT | Reset Password for: ${user.username}`;
            const html = `
                <div>
                    <h4>Recovery</h4>
                    <p">Use this token to recover your account:</p>
                    <p style="color: blue;">${hash}</p>
                </div>
            `;
            const sent = await sendEmail(email, subject, html);
            if (sent) {
                // Email was properly sent
                const goodSend = { updated: true, message: 'Recovery email sent, when you recieve the email enter the token above.'};
                res.status(201).send(goodSend);
            } else {
                res.status(400).send(badSend);
                return;
            }
        } catch(err) {
            console.error(err);
            res.sendStatus(500);
        }
    },

    verifyHash: async (req, res) => {
        try {
            const { hash, searchItem, hashType } = req.body;
            const user = await getUser(searchItem);
            // Compare stored hash with one presented
            if (hash === user.recovery[hashType]) {
                // Hash's match, allow user to update
                const response = { match: true, message: 'Verified, please choose a new password' };
                res.status(201).send(response);
            } else {
                const reponse = { match: false, message: 'Please make sure the token is correct' };
                res.status(201).send(response);
            }
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    },

    updatePassword: async (req, res) => {
        try {
            const { searchItem, newPassword } = req.body;
            const query = isEmail(searchItem)
                ? { email: searchItem.toLowerCase() }
                : { username: searchItem.toLowerCase() };

            // Hash the password
            const hashed_pwd = await bcrypt.hash(newPassword, saltRounds);
            const update = { hashed_pwd };

            await Users.findOneAndUpdate(query, update);
            const response = { updated: true, message: 'Password changed, please log in.' };
            res.status(201).send(response);
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    },


}
