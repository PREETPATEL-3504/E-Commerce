const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "skyllect.preet@gmail.com",
    pass: "kdza sdix ziif xvtk",
  },
});

const  mail = (emailTo, subject, body) => {
  var mailOptions = {
    from: "skyllect.preet@gmail.com",
    to: emailTo,
    subject: subject,
    text: body,
  };

  if (transporter) {
    transporter.sendMail(mailOptions);
  } else {
    console.error("transporter is undefined");
  }
}
module.exports = mail;
