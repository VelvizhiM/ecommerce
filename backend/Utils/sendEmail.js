const nodemailer  = require('nodemailer');

const sendEmail = async options => {
    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "bf90439294608a",
          pass: "fa2208f849b847"
        }
      });

    const message = {
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    await transporter.sendMail(message)

}

module.exports = sendEmail;