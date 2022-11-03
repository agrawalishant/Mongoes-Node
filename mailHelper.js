const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'piyush.therapidhire@gmail.com',
              pass: 'trhp2014'
            }
          });
          
          var mailOptions = {
            from: 'piyush.therapidhire@gmail.com',
            to: email,
            subject: subject,
            html: '<a href='+text+'>password reset link </a>'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;