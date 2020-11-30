const nodemailer = require('nodemailer');

const defaultHost = 'alexander.prk7@gmail.com';
const defaultSender = 'vkowalex@gmail.com';
const senderPass = 'jsdfhiujnqpm&^^(n2oi9';

 module.exports.send = function send(message) {

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: defaultSender,  // generated ethereal user
            pass: senderPass     // generated ethereal password
        }
    });

// send mail with defined transport object
transporter.sendMail({
    from: defaultSender,  // sender address
    to: defaultHost,      // list of receivers
    subject: 'Test',      // Subject line
    text: message        // plain text body
});
}
