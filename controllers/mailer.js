const nodemailer = require('nodemailer');

const main = async (req, res) => {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    let info = await transporter.sendMail({
        from: '"Fred Foo" <foo@exmaple.com>',
        to: "chrisnote1337@gmail.com",
        subject: "dev",
        text: "Hello",
        html: "<h1>This is HTML</h1>"
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s",
    nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);
main();

module.exports = main;
