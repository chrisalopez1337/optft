const { SendGridApiKey } = require('../config');
const sgMail = require('@sendgrid/mail')

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

main();
module.exports = { main };
