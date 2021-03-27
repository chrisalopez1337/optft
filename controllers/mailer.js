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
        console.log(searchItem, query)

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
        console.error(err);
    }
}

// Server side functions
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
            const hash = await updatePasswordHash(searchItem, user.recovery);
            // Format email
            const email = user.email;
            const subject = `OPTFT | Reset Password for: ${user.username}`;
            const html = `
                <style>
                    .container {
                        display: flex;
                        align-items: flex;
                        justify-content: center;
                        flex-direction: column;
                    }
                    
                    .token {
                        color: blue;
                    }
                </style>
                <div class="container">
                    <h4>Recovery</h4>
                    <p>Use this token to recover your account: <span class="token">${hash}</span>
                </div>
            `;
            const sent = await sendEmail(email, subject, html);
            if (sent) {
                // Email was properly sent
                const goodSend = { updated: true, message: 'Recovery email sent, when you recieve the email click the button below.'};
                res.status(201).send(goodSend);
            } else {
                res.status(400).send(badSend);
                return;
            }
        } catch(err) {
            console.error(err);
        }
    }
}
