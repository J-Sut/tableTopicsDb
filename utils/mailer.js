'use strict';
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // secure:true for port 465, secure:false for port 587
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

function send(to, subject, content){
  // setup email data with unicode symbols
  let _subject = subject || 'Hello from Table Topics';
  let mailOptions = {
    from: `"Table Topics DB" <${process.env.EMAIL}>`, // sender address
    to: to, // list of receivers
    subject: _subject, // Subject line
    text: content, // plain text body
    //html: '' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
}

export default { send };