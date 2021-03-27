// Mailer setup
const { SendGridApiKey } = require('../config');
const sgMail = require('@sendgrid/mail')
// DB Model
const { Users } = require('../database');
// Model function, for testing
const main = async (req, res) => {
    try {
        sgMail.setApiKey(SendGridApiKey);
        const message = {
            to: 'chrisnote1337@gmail.com',
            from: 'sakura.lopez.dev@gmail.com',
            subject: 'Testing',
            text: 'Test',
            html: '<h1>Hello</h1>',
        }
        await sgMail.send(message);
        console.log('Email sent');
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

module.exports = {
    handlePasswordResetEmail: async (req, res) => {
        try {
            // First we need to store a token in the DB to allow the user to recover account.
        } catch(err) {

        }
    }
}
