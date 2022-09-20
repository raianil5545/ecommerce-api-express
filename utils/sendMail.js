const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 465,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAILTRAP_USERNAME, 
      pass: process.env.MAILTRAP_PASSWORD,
    },
});


let sendMail = (users, msg) => {
    transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>',
        to: users,
        subject: "Hello ✔", 
        text: msg
    })
}

module.exports = sendMail