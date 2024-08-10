const nodemailer = require('nodemailer');
require('dotenv').config();
const MailSender = async (email, title, body) => {
    try {
        let transpoter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }, tls: {
                rejectUnauthorized: false
            }
        });

        let info = await transpoter.sendMail({
            from: "study notion || man patel",
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`
        })

        console.log("mail send details:", info);
        return info;

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = MailSender;