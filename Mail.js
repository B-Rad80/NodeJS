var nodemailer = require('nodemailer');
const pass = ''
var ex = function mailinfo(from, email,subject, message){
    this.from = from
    this.message = message

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'BrandonRNoReply@gmail.com',
        pass: pass
      }
    });

    var mailOptions = {
      from: 'BrandonRNoReply@gmail.com',
      to: 'Roemer.Brandon429@gmail.com',
      subject: subject,
      text: from+ email + message
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

  };

module.exports.Mailer = ex;
