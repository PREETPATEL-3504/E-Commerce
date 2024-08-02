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

module.exports = transporter;
